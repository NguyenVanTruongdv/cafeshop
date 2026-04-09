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

        public class RegisterRequest
        {
            public string Name { get; set; }
            [Required(ErrorMessage ="Địa chỉ email là bắt buộc")]
            [EmailAddress(ErrorMessage ="Địa chỉ email không hợp lệ")]
            public string Email { get; set; }
            public string Password { get; set; }
        }
        
    }
}
