using Microsoft.AspNetCore.Mvc;

using CafeShopAPI.DTOs;

[ApiController]
[Route("api/products")]

public class ProductImageController : ControllerBase
{
    private readonly ProductImageService sv;


    public ProductImageController(ProductImageService _service)
    {
        sv = _service;
    }

    [HttpGet("{id}/images")]
    public async Task<IActionResult> GetImages(int id)
    {
        var result = await sv.GetByProductId(id);
        return Ok(result);
    }

    [HttpPost("{id}/images")]
    public async Task<IActionResult> UploadImages(int id, [FromForm] UploadProductImageDTO dto)
    {
        try
        {
            if (dto.Files == null || dto.Files.Count == 0)
                return BadRequest("Chưa có file được tải lên");

            var result = await sv.UploadImages(id, dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
        [HttpPut("{imageId}")]
    public async Task<IActionResult> UpdateImage(int imageId, IFormFile file)
    {
        var result = await sv.UpdateImage(imageId, file);

        if (result == null)
            return NotFound();

        return Ok(result);
    }
    [HttpDelete("images/{imageId}")]
    public async Task<IActionResult> DeleteImage(int imageId)
    {
        var result = await sv.DeleteImage(imageId);

        if (!result)
            return NotFound("Image not found");

        return Ok("Deleted");
    }


    // 🔹 4. Set ảnh chính
    [HttpPut("{productId}/images/{imageId}/set-main")]
    public async Task<IActionResult> SetMain(int productId, int imageId)
    {
        var result = await sv.SetMainImage(productId, imageId);

        if (!result)
            return NotFound("Image or Product not found");

        return Ok("Updated");
    }

}