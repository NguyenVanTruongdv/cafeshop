using CafeShopAPI.Data;
using CafeShopAPI.DTOs;
using CafeShopAPI.Enums;
using CafeShopAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using static CafeShopAPI.DTOs.AuthDto;
using static System.Net.WebRequestMethods;

namespace CafeShopAPI.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly JwtService _jwtService;
        private readonly IHttpContextAccessor _http;

        public AuthService (AppDbContext context, IConfiguration config, JwtService jwtService, IHttpContextAccessor http)
        {
            _context = context;
            _config = config;
            _jwtService = jwtService;
            _http = http;   
        }

        private int? getAuthID()
        {
            var userId = _http.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return null;
            return int.Parse(userId.ToString());
        }

        public async Task<ApiDtoResponse<object>> Register(RegisterRequest re)
        {
            var userEmail = new MailAddress(re.Email);
            if (userEmail.Address != re.Email)
                return new ApiDtoResponse<object>
                {
                    Message ="Email không hợp lệ",
                    Data = null
                };
            if (_context.Users.Any(x => x.Email == re.Email))
                return new ApiDtoResponse<object>
                {
                    Message = "Email đã tồn tại",
                    Data = null
                };

            var user = new User
            {
                Email = re.Email,
                Name = re.Name,
                Role = UserRole.Customer,
                Password = BCrypt.Net.BCrypt.HashPassword(re.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new ApiDtoResponse<object> { 
                Message = "Đăng ký tài khoản thành công",
                Data= new
                {
                    user.Id, 
                    user.Email,
                    user.Name,
                }
            };
        }


        public async Task<ApiDtoResponse<object>> Login(LoginRequest log)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email.Trim() == log.Email.Trim());
            if (user == null)
                return new ApiDtoResponse<object>
                {
                    Message = "Sai email hoặc mật khẩu không đúng",
                    Data  = null
                };
            bool check = BCrypt.Net.BCrypt.Verify(log.Password, user.Password);
            if (!check) return new ApiDtoResponse<object>
            {
                Message = "Sai email hoặc mật khẩu không đúng",
                Data  = null
            };

            var token = _jwtService.GenerateJwtToken(user);
            return new ApiDtoResponse<object>
            {
                Message = "Đăng nhập thành công",
                Data  = new
                {
                    token,
                    user = new
                    {
                        user.Id,
                        user.Name,
                        user.Email,
                        user.Role,
                    }
                }
            };
        }

        public async Task<ApiDtoResponse<object>> resetPassword(ResetPasswordRequest re)
        {
            var IdAuth = getAuthID();
            if (IdAuth == null)
                return new ApiDtoResponse<object>
                {
                    Message = "Chưa xác thực người dùng",
                    Data = null
                };
            var user = _context.Users.FirstOrDefault(x => x.Id == IdAuth);
            bool check = BCrypt.Net.BCrypt.Verify(re.OldPass, user.Password);
            if (!check)
                return new ApiDtoResponse<object>
                {
                    Message = "Mật khẩu cũ không chính xác",
                    Data   = null
                };
            else
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(re.NewPass);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return new ApiDtoResponse<object> {
                    Message = "Cập nhật mật khẩu mới thành công",
                    Data = new ResetPasswordResponse
                    {
                        Name = user.Name,
                        Email = user.Email
                    }
                };
            }
        }
    }
}
