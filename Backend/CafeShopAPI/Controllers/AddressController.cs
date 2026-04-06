using CafeShopAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static CafeShopAPI.DTOs.AddressDto;

namespace CafeShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AddressController :ControllerBase
    {
        private readonly AddressService _service;
        public AddressController(AddressService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateAddress dto)
        {
            return Ok(await _service.Create(dto));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetMy());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            var result = await _service.deleteById(id);
            if( result == null)
                return BadRequest(result);
            return NotFound(result);
        }

    }
}
