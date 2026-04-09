using CafeShopAPI.DTOs;
using CafeShopAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CafeShopAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController :ControllerBase 
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthDto.LoginRequest re)
        {
            var result = await _authService.Login(re);

            if (result.Data == null)
                return BadRequest(result);
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(AuthDto.RegisterRequest re)
        {
            var result = await _authService.Register(re);
            if (result.Data == null)
                return BadRequest(result);
            return Ok(result);
        }
    }
}
