using CafeShopAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CafeShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController:ControllerBase
    {
        private readonly UserService _service;
        public UserController(UserService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.getAll());
        }
    }
}
