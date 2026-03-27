using Microsoft.AspNetCore.Mvc;
using CafeShopAPI.Models;
using CafeShopAPI.Services;

namespace CafeShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {
        private readonly DanhMucService _service;

        public DanhMucController(DanhMucService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _service.GetById(id);

            if (data == null)
                return NotFound(new { message = "Không tìm thấy danh mục" });

            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DanhMuc dm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.Create(dm);

            if (result == null)
                return BadRequest(new { message = "Danh mục đã tồn tại" });

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DanhMuc dm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.Update(id, dm);

            if (result == null)
                return BadRequest(new { message = "Không tìm thấy hoặc bị trùng tên" });

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.Delete(id);

            if (!ok)
                return NotFound(new { message = "Không tìm thấy danh mục" });

            return Ok(new { message = "Xoá thành công" });
        }
    }
}