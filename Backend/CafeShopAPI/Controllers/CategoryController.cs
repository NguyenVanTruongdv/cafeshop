using Microsoft.AspNetCore.Mvc;

using CafeShopAPI.DTOs;
using CafeShopAPI.Services;

namespace CafeShopAPI.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService sv;
        public CategoryController(CategoryService _sv)
        {
            sv = _sv;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await sv.GetAll();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await sv.GetByID(id);
            if (data == null)
                return NotFound();

            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDTO dto)
        {
            var result = await sv.Create(dto);
            if (!result)
                return BadRequest("Danh mục đã tồn tại");

            return Ok("Thêm thành công");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateCategoryDTO dto)
        {
            var result = await sv.Update(id, dto);
            if (!result)
                return NotFound("Không tìm thấy danh mục");

            return Ok("Update thành công");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await sv.Delete(id);
            if (!result)
                return NotFound("Không tìm thấy danh mục");

            return Ok("Xóa thành công");
        }

    }
}