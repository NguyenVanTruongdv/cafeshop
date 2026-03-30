using CafeShopAPI.Data;
using CafeShopAPI.DTOs;
using CafeShopAPI.Enums;
using CafeShopAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
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

        public async Task<object?> Register(RegisterRequest re)
        {
            if (_context.Users.Any(x => x.Email == re.Email))
                return "Email đã tồn tại";

            var user = new User
            {
                Email = re.Email,
                Name = re.Name,
                Role = UserRole.Customer,
                Password = BCrypt.Net.BCrypt.HashPassword(re.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new { Message = "Đăng ký tài khoản thành công" };
        }


        public async Task<object?>Login(LoginRequest log)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email.Trim() == log.Email.Trim());
            if (user == null)
                return "Sai email hoặc mật khẩu";
            bool check = BCrypt.Net.BCrypt.Verify(log.Password, user.Password);
            if (!check) return "Sai email hoặc mật khẩu";

            var token = _jwtService.GenerateJwtToken(user);
            return new
            {
                token,
                user = new
                {
                    user.Id,
                    user.Email,
                    user.Name,
                    user.Role
                }
            };
        }
    }
}
