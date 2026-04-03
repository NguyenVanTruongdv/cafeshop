using AutoMapper;
using CafeShopAPI.Models;
using static CafeShopAPI.DTOs.AddressDto;

namespace CafeShopAPI.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Address, AddressResponse>();
        }
    }
}
