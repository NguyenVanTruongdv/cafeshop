using CafeShopAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static CafeShopAPI.DTOs.UserDto;

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
        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.getAll());
        }

        [HttpGet("admin/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetByID(int id)
        {
            var result = await _service.findById(id);
            if (result == null)
                return BadRequest("Không tìm thấy người dùng");
            return Ok(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateByUser(UserCreate user)
        {
            var result = await _service.updateUser(user);
            if (result == null)
                return BadRequest("Cập nhật thất bại");
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUserByAdmin(int id)
        {
            var result = await _service.deleteUser(id);
            if (result == false)
                return BadRequest("Không có quyền xóa thông tin user");
            return Ok(result);
        }
    }
}
