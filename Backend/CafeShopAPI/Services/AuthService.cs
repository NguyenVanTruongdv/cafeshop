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

namespace CafeShopAPI.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly JwtService _jwtService;

        public AuthService (AppDbContext context, IConfiguration config, JwtService jwtService)
        {
            _context = context;
            _config = config;
            _jwtService = jwtService;
        }

        public async Task<ApiResponse<object>> Register(RegisterRequest re)
        {
            var userEmail = new MailAddress(re.Email);
            if (userEmail.Address != re.Email)
                return new ApiResponse<object>
                {
                    Message ="Email không hợp lệ",
                    Data = null
                };
            if (_context.Users.Any(x => x.Email == re.Email))
                return new ApiResponse<object>
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

            return new ApiResponse<object> { 
                Message = "Đăng ký tài khoản thành công",
                Data= new
                {
                    user.Id, 
                    user.Email,
                    user.Name,
                }
            };
        }


        public async Task<ApiResponse<object>> Login(LoginRequest log)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email.Trim() == log.Email.Trim());
            if (user == null)
                return new ApiResponse<object>
                {
                    Message = "Sai email hoặc mật khẩu không đúng",
                    Data  = null
                };
            bool check = BCrypt.Net.BCrypt.Verify(log.Password, user.Password);
            if (!check) return new ApiResponse<object>
            {
                Message = "Sai email hoặc mật khẩu không đúng",
                Data  = null
            };

            var token = _jwtService.GenerateJwtToken(user);
            return new ApiResponse<object>
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
    }
}
