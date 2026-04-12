using AutoMapper;
using AutoMapper.QueryableExtensions;
using CafeShopAPI.Data;
using CafeShopAPI.DTOs;
using CafeShopAPI.Enums;
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
        public async Task<ApiDtoResponse<AddressResponse>> Create(CreateAddress dto)
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
            return new ApiDtoResponse<AddressResponse>
            {
                Message = "Tạo địa chỉ thành công",
                Data  = _mapper.Map<AddressResponse>(address)
            }; 
        }

        // lấy tất cả địa chỉ của người dùng đang đăng nhập
        public async Task<ApiDtoResponse<List<AddressResponse>>> GetMy()
        {
            var userId = getUserId();
            var data = await _context.Addresses.Where(x => x.UserId == userId)
                .ProjectTo<AddressResponse>(_mapper.ConfigurationProvider).ToListAsync();
            return new ApiDtoResponse<List<AddressResponse>>
            {
                Message = "Lấy danh sách địa chỉ thành công",
                Data = data
            };
        }

        // xóa địa chỉ mà người dùng đang đăng nhập
        public async Task<ApiDtoResponse<AddressResponse>> deleteById(int id)
        {
            var userid = getUserId();
            if (userid == null)
                return new ApiDtoResponse<AddressResponse>
                {
                    Message = "Chưa đăng nhập tài khoản",
                    Data = null
                };
            var data = await _context.Addresses.FirstOrDefaultAsync( x => x.Id == id && userid == x.UserId);
            if (data == null)
                return new ApiDtoResponse<AddressResponse>
                {
                    Message = "Không tìm thấy địa chỉ cần xóa",
                    Data = null
                };
            _context.Addresses.Remove(data);
            await _context.SaveChangesAsync();
            return new ApiDtoResponse<AddressResponse>
            {
                Message = "Xóa địa chỉ thành công rồi nha",
                Data = _mapper.Map<AddressResponse>(data)
            };
        }

        //sửa địa chỉ của người dùng đang đăng nhập 
        public async Task<ApiDtoResponse<AddressResponse>> updateAddress(int id, CreateAddress map)
        {
            var userId = getUserId();
            if (userId == null)
                return new ApiDtoResponse<AddressResponse>
                {
                    Message = "Người dùng chưa đăng nhập",
                    Data    = null
                };
            var data = await _context.Addresses.FirstOrDefaultAsync(x => x.UserId == userId 
            && x.Id == id);
            if (data == null)
                return new ApiDtoResponse<AddressResponse>
                {
                    Message = "Không tồn tại dữ liệu địa chỉ muốn sửa",
                    Data  = null
                };
            data.AddressDetail = map.AddressDetail;
            data.Longitude = map.Longitude;
            data.Latitude = map.Latitude;
            _context.Addresses.Update(data);
            await _context.SaveChangesAsync();
            return new ApiDtoResponse<AddressResponse>
            {
                Message= "Cập nhật dữ liệu mới thành công",
                Data  = _mapper.Map<AddressResponse>(data)
            };
        }

        // ADMIN
        // lấy all địa chỉ
        public async Task<ApiDtoResponse<List<AddressResponse>>> getAllAddressUsers()
        {
            var data = await _context.Addresses
                .ProjectTo<AddressResponse>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return new ApiDtoResponse<List<AddressResponse>>
            {
                Message = "Lấy tất cả địa chỉ thành công",
                Data = data
            };
        }

        // xóa địa chỉ theo id
        public async Task<ApiDtoResponse<AddressResponse>> deleteByIdAdmin(int id)
        {
            var address = await _context.Addresses.FirstOrDefaultAsync(x => x.Id == id);
            if (address == null)
                return new ApiDtoResponse<AddressResponse>
                {
                    Message = "Không tìm thấy địa chỉ cần xóa",
                    Data = null
                };
            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();
            return new ApiDtoResponse<AddressResponse>
            {
                Message = "Địa chỉ đã được xóa",
                Data = _mapper.Map<AddressResponse>(address)
            };
        }

        private double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
        {
            const double R = 6371; // km

            var dLat = ToRadians(lat2 - lat1);
            var dLon = ToRadians(lon2 - lon1);

            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            return R * c;
        }

        private double ToRadians(double angle)
        {
            return angle * Math.PI / 180;
        }
        public async Task<ApiDtoResponse<AddressResponse>> GetNearestAdmin(double lat, double lng)
        {
            var adminAddresses = await _context.Addresses
                .Where(a => a.User.Role == UserRole.Admin)
                .ToListAsync();

            if (!adminAddresses.Any())
            {
                return new ApiDtoResponse<AddressResponse>
                {
                    Message = "Không tìm thấy địa chỉ admin"
                };
            }

            Address nearest = null;
            double minDistance = double.MaxValue;

            foreach (var addr in adminAddresses)
            {
                double distance = CalculateDistance(
                    lat, lng,
                    (double)addr.Latitude,
                    (double)addr.Longitude
                );

                if (distance < minDistance)
                {
                    minDistance = distance;
                    nearest = addr;
                }
            }

            // map sang DTO
            var result = new AddressResponse
            {
                Id = nearest.Id,
                AddressDetail = nearest.AddressDetail,
                Latitude = nearest.Latitude ?? 0.0,
                Longitude = nearest.Longitude ?? 0.0
            };

            return new ApiDtoResponse<AddressResponse>
            {
                Message = "Lấy địa chỉ shop gần nhất thành công",
                Data = result
            };
        }
    }
}
