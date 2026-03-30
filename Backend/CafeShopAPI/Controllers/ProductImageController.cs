using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductImageController : ControllerBase
{
    private readonly ProductImageService sv;

    public ProductImageController(ProductImageService _sv)
    {
        sv = _sv;
    }

    // GET BY PRODUCT
    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetByProduct(int productId)
    {
        return Ok(await sv.GetByProductId(productId));
    }

    // CREATE
    [HttpPost]
    public async Task<IActionResult> Create(CreateProductImageDTO dto)
    {
        return Ok(await sv.Create(dto));
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await sv.Delete(id);
        if (!result) return NotFound();

        return Ok("Deleted");
    }

    // SET MAIN
    [HttpPut("set-main/{id}")]
    public async Task<IActionResult> SetMain(int id)
    {
        var result = await sv.SetMain(id);
        if (!result) return NotFound();

        return Ok("Updated main image");
    }
}