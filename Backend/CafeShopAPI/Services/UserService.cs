using AutoMapper;
using CafeShopAPI.Data;
using CafeShopAPI.DTOs;
using CafeShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static CafeShopAPI.DTOs.UserDto;

namespace CafeShopAPI.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _http;
        private readonly IMapper _mapper;

        public UserService(AppDbContext context, IHttpContextAccessor http, IMapper mapper)
        {
            _context = context;
            _http = http;
            _mapper = mapper;
        }

        private int? getAuthID()
        {
            var userId = _http.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return null;
            return int.Parse(userId.ToString());
        }

        public async Task<ApiDtoResponse<List<UserResponse>>> getAll()
        {
            var data = await _context.Users.Select(u => new UserResponse
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email
            }).ToListAsync();
            return new ApiDtoResponse<List<UserResponse>>
            {
                Message = "Lấy danh sách users thành công",
                Data  = data
            };
        }

        public async Task<ApiDtoResponse<UserResponse?>> findById(int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
            if (user == null)
                return new ApiDtoResponse<UserResponse?>
                {
                    Message = "Không tìm thấy id",
                    Data = null
                };
            return new ApiDtoResponse<UserResponse?>
            {
                Message = "Lấy thông tin thành công",
                Data = _mapper.Map<UserResponse>(user)
            };
        }

        public async Task<ApiDtoResponse<UserResponse?>> updateUser(UserCreate user)
        {
            var idAuth = getAuthID();
            if ( idAuth == null)
                return new ApiDtoResponse<UserResponse?>
                {
                    Message = "Người dùng chưa đăng nhập",
                    Data = null
                };
            var userOld = await _context.Users.SingleOrDefaultAsync(u => u.Id == idAuth);
            if (userOld == null)
                return new ApiDtoResponse<UserResponse?>
                {
                    Message = "Thông tin không khớp",
                    Data = null
                };
            if ( idAuth == userOld.Id)
            {
                userOld.Name = user.Name;
                userOld.Email = user.Email;
                _context.Users.Update(userOld);
                await _context.SaveChangesAsync();
                return new ApiDtoResponse<UserResponse?>
                {
                    Message = "Cập nhật thông tin thành công",
                    Data = _mapper.Map<UserResponse>(userOld)
                };
            }
            return new ApiDtoResponse<UserResponse?>
            {
                Message = "Cập nhật thất bại",
                Data = null
            };
        }

        public async Task<bool> deleteUser(int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u =>u.Id == id);
            if( user == null) return false;
            _context.Users.Remove(user);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
    }
}
