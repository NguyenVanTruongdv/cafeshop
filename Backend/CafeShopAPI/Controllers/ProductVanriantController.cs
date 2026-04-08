using CafeShopAPI.DTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/productvairants")]
[ApiController]
public class ProductVariantController : ControllerBase
{
    private readonly ProductVariantService sv;

    public ProductVariantController(ProductVariantService _sv)
    {
        sv = _sv;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await sv.GetAll());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await sv.GetById(id);
        if (result == null) return NotFound();

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductVariantDTO dto)
    {
        var result = await sv.Create(dto);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CreateProductVariantDTO dto)
    {
        var result = await sv.Update(id, dto);
        if (!result) return NotFound();

        return Ok("Updated successfully");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await sv.Delete(id);
        if (!result) return NotFound();

        return Ok("Deleted successfully");
    }
}