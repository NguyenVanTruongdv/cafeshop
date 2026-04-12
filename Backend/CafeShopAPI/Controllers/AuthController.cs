using CafeShopAPI.DTOs;
using CafeShopAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static CafeShopAPI.DTOs.AuthDto;

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
        public async Task<IActionResult> Login(LoginRequest re)
        {
            var result = await _authService.Login(re);

            if (result.Data == null)
                return BadRequest(result);
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest re)
        {
            var result = await _authService.Register(re);
            if (result.Data == null)
                return BadRequest(result);
            return Ok(result);
        }

        [HttpPut("reset-password")]
        [Authorize]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest re)
        {
            var result = await _authService.resetPassword(re);
            if(result.Data == null)
                return BadRequest(result);
            return Ok(result);
        }
    }
}
