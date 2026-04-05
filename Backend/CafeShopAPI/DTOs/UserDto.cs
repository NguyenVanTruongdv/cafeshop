using CafeShopAPI.Enums;

namespace CafeShopAPI.DTOs
{
    public class UserDto
    {
        public class UserCreate
        {
            public string Name { get; set; }
            public string Email { get; set; }
        }

        public class UserResponse
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public UserRole Role { get; set; }
        }
    }
}
