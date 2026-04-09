using AutoMapper;
using CafeShopAPI.Models;
using static CafeShopAPI.DTOs.AddressDto;
using static CafeShopAPI.DTOs.UserDto;

namespace CafeShopAPI.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Address, AddressResponse>();
            CreateMap<User, UserResponse>();
        }
    }
}
