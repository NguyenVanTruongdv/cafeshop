using CafeShopAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace CafeShopAPI.DTOs
{
    public class AuthDto
    {
        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class ResetPasswordRequest
        {
            public string OldPass { get; set; }
            public string NewPass { get; set; }
        }

        public class RegisterRequest
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class AuthResponse
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public UserRole Role { get; set; }
        }

        public class ResetPasswordResponse
        {
            public string Name { get; set; }
            public string Email { get; set; }
        }
    }
}
