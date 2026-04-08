using Microsoft.EntityFrameworkCore;
using CafeShopAPI.Data;
using CafeShopAPI.Models;
public class ProductImageService
{
    private readonly AppDbContext db;

    public ProductImageService(AppDbContext _db)
    {
        db = _db;
    }

    // 🔹 1. Lấy danh sách ảnh theo product
    public async Task<List<ProductImgDTO>> GetByProductId(int id)
    {
        return await db.ProductImages
            .Where(x => x.ProductId == id)
            .OrderByDescending(x => x.IsMain)
            .Select(x => new ProductImgDTO
            {
                Id = x.Id,

                ImageUrl = x.ImageUrl ?? "",
    
                IsMain = x.IsMain ?? false
            })
            .ToListAsync();
    }

    // 🔹 2. Upload ảnh
    public async Task<List<ProductImgDTO>> UploadImages(int id, UploadProductImageDTO dto)
    {
        // 1. check product tồn tại
        var product = await db.Products.FindAsync(id);
        if (product == null)
            throw new Exception("Product not found");

        // 2. check file
        if (dto.Files == null || dto.Files.Count == 0)
            throw new Exception("No files");
        var imgCount = await db.ProductImages.CountAsync(i => i.ProductId == id);
        if (imgCount >= 3)
            throw new Exception("Upload tối đa 3 ảnh");
        // 3. tạo folder nếu chưa có
        var folder = Path.Combine("wwwroot/images");
        if (!Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }

        // 4. kiểm tra product đã có ảnh chưa
        bool hasAnyImage = await db.ProductImages
            .AnyAsync(x => x.ProductId == id);

        bool isMainAssigned = false;

        var newImages = new List<ProductImage>();

        // 5. loop upload
        foreach (var file in dto.Files)
        {
            // validate file
            if (!file.ContentType.StartsWith("image/"))
                continue;

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var path = Path.Combine(folder, fileName);

            // lưu file
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var image = new ProductImage
            {
                ProductId = id,
                ImageUrl = "/images/" + fileName,
                IsMain = false
            };

            // 🔥 set ảnh đầu tiên làm main (chỉ khi chưa có ảnh nào)
            if (!hasAnyImage && !isMainAssigned)
            {
                image.IsMain = true;
                isMainAssigned = true;
            }

            newImages.Add(image);
        }

        // 6. save DB
        db.ProductImages.AddRange(newImages);
        await db.SaveChangesAsync();

        // 7. map sang DTO
        return newImages.Select(x => new ProductImgDTO
        {
            Id = x.Id,
            ImageUrl = x.ImageUrl!,
            IsMain = x.IsMain ?? false
        }).ToList();
    }
    // 🔹 3. Xoá ảnh
    public async Task<bool> DeleteImage(int imageId)
    {
        var image = await db.ProductImages.FindAsync(imageId);
        if (image == null)
            return false;
        // nếu ảnh bị xóa là ảnh chính thì set ảnh đầu tiên thì lấy ảnh đầu tiên tiếp theo set là ảnh chính
        if (image.IsMain == true)
        {
            var another = await db.ProductImages
                .FirstOrDefaultAsync(x => x.ProductId == image.ProductId && x.Id != imageId);

            if (another != null)
            {
                another.IsMain = true;
            }
        }
        // xoá file vật lý
        var fullPath = Path.Combine("wwwroot", image.ImageUrl!.TrimStart('/'));
        if (File.Exists(fullPath))
        {
            File.Delete(fullPath);
        }

        db.ProductImages.Remove(image);
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<ProductImgDTO?> UpdateImage(int imageId, IFormFile file)
{
    var image = await db.ProductImages.FindAsync(imageId);
    if (image == null)
        return null; 

    // ❌ validate file
    if (file == null || !file.ContentType.StartsWith("image/"))
        throw new Exception("Invalid file");

    // 🗑️ xoá file cũ
    var oldPath = Path.Combine("wwwroot", image.ImageUrl!.TrimStart('/'));
    if (File.Exists(oldPath))
    {
        File.Delete(oldPath);
    }

    // 📁 tạo file mới
    var folder = Path.Combine("wwwroot/images");
    if (!Directory.Exists(folder))
    {
        Directory.CreateDirectory(folder);
    }

    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
    var newPath = Path.Combine(folder, fileName);

    using (var stream = new FileStream(newPath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    // 🔥 update DB
    image.ImageUrl = "/images/" + fileName;

    await db.SaveChangesAsync();

    return new ProductImgDTO
    {
        Id = image.Id,
        ImageUrl = image.ImageUrl!,
        IsMain = image.IsMain ?? false
    };
}
    // 🔹 4. Set ảnh chính
    public async Task<bool> SetMainImage(int productId, int imageId)
    {
        var images = await db.ProductImages
            .Where(x => x.ProductId == productId)
            .ToListAsync();

        if (!images.Any())
            return false;

        foreach (var img in images)
        {
            img.IsMain = (img.Id == imageId);
            //is main sẽ được gán là true khi mà id ảnh trùng với id ảnh được gửi lên từ fe
        }

        await db.SaveChangesAsync();
        return true;
    }
}