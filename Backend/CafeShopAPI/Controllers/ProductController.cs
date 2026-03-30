using CafeShopAPI.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly ProductService sv;

    public ProductController(ProductService _sv)
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
   [HttpPost]
    public async Task<IActionResult> Create(CreateProductDTO dto)
    {
        try
        {
            var result = await sv.Create(dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CreateProductDTO dto)
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