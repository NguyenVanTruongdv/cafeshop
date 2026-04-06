using AutoMapper;
using AutoMapper.QueryableExtensions;
using CafeShopAPI.Data;
using CafeShopAPI.DTOs;
using CafeShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static CafeShopAPI.DTOs.AddressDto;

namespace CafeShopAPI.Services
{
    public class AddressService
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _http;
        private readonly IMapper _mapper;

        public AddressService(AppDbContext context, IHttpContextAccessor http, IMapper mapper)
        {
            _context = context;
            _http = http;
            _mapper = mapper;
        }

        private int getUserId()
        {
            var userID = _http.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userID);
        }

        // tạo địa chỉ mới cho người dùng đang đăng nhập
        public async Task<AddressResponse> Create(CreateAddress dto)
        {
            var useId = getUserId();

            var address = new Address
            {
                AddressDetail = dto.AddressDetail,
                Longitude= dto.Longitude,
                Latitude= dto.Latitude,
                UserId = useId
            };

            _context.Add(address);
            await _context.SaveChangesAsync();
            return _mapper.Map<AddressResponse>(address);          
        }

        // lấy tất cả địa chỉ của người dùng đang đăng nhập
        public async Task<List<AddressResponse>> GetMy()
        {
            var userId = getUserId();
            return await _context.Addresses.Where(x => x.UserId == userId)
                .ProjectTo<AddressResponse>(_mapper.ConfigurationProvider).ToListAsync();
        }

        // xóa địa chỉ mà người dùng đang đăng nhập
        public async Task<ApiResponse<AddressResponse>> deleteById(int id)
        {
            var userid = getUserId();
            if (userid == null)
                return new ApiResponse<AddressResponse>
                {
                    Message = "Chưa đăng nhập tài khoản",
                    Data = null
                };
            var data = await _context.Addresses.FirstOrDefaultAsync( x => x.Id == id && userid == x.UserId);
            if (data == null)
                return new ApiResponse<AddressResponse>
                {
                    Message = "Không tìm thấy địa chỉ cần xóa",
                    Data = null
                };
            _context.Addresses.Remove(data);
            await _context.SaveChangesAsync();
            return new ApiResponse<AddressResponse>
            {
                Message = "Xóa địa chỉ thành công rồi nha",
                Data = _mapper.Map<AddressResponse>(data)
            };
        }

        //sửa địa chỉ của người dùng đang đăng nhập 
        public async Task<ApiResponse<AddressResponse>> updateAddress(int id, CreateAddress map)
        {
            var userId = getUserId();
            if (userId == null)
                return new ApiResponse<AddressResponse>
                {
                    Message = "Người dùng chưa đăng nhập",
                    Data    = null
                };
            var data = await _context.Addresses.FirstOrDefaultAsync(x => x.UserId == userId 
            && x.Id == id);
            if (data == null)
                return new ApiResponse<AddressResponse>
                {
                    Message = "Không tồn tại dữ liệu",
                    Data  = null
                };
            data.AddressDetail = map.AddressDetail;
            data.Longitude = map.Longitude;
            data.Latitude = map.Latitude;
            _context.Addresses.Update(data);
            await _context.SaveChangesAsync();
            return new ApiResponse<AddressResponse>
            {
                Message= "Cập nhật dữ liệu mới thành công",
                Data  = _mapper.Map<AddressResponse>(data)
            };
        }
    }
}
