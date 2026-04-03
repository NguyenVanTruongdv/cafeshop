using CafeShopAPI.Data;
using CafeShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using static CafeShopAPI.DTOs.UserDto;

namespace CafeShopAPI.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService ( AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserGet>> getAll()
        {
            return await _context.Users.Select(u => new UserGet{
            Id = u.Id,
            Name = u.Name,
            Email = u.Email}).ToListAsync();
        }
    }
}
