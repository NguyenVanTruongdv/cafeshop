using AutoMapper;
using AutoMapper.QueryableExtensions;
using CafeShopAPI.Data;
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

        public async Task<List<AddressResponse>> GetMy()
        {
            var userId = getUserId();
            return await _context.Addresses.Where(x => x.UserId == userId)
                .ProjectTo<AddressResponse>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
