using Microsoft.EntityFrameworkCore;
using CafeShopAPI.Models;
using CafeShopAPI.Data;
using CafeShopAPI.DTOs;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
public class ProductService
{
    private readonly AppDbContext db;

    public ProductService(AppDbContext _db)
    {
        db = _db;
    }

    // GET ALL
    public async Task<List<ProductDTO>> GetAll()
    {
        var p = await db.Products
            .Include(p => p.Category)
            .Include(p => p.ProductImages)
            .Include(p => p.ProductVariants)
            .ToListAsync();
        return p.Select(p => new ProductDTO
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            CategoryName = p.Category?.Name,
            urlImgMain = p.ProductImages.FirstOrDefault(i => i.IsMain == true).ImageUrl,
        }).ToList();


    }

    // GET BY ID
    public async Task<ProductInfoDTO> GetById(int id)
    {
        var p = await db.Products
            .Include(p => p.Category)
            .Include(p => p.ProductImages)
            .Include(p => p.ProductVariants)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (p == null) return null;

        return new ProductInfoDTO
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            CategoryName = p.Category?.Name,
            urlImgMain = p.ProductImages.FirstOrDefault(i => i.IsMain == true).ImageUrl,
            Images = p.ProductImages.Select(i => new ProductImgDTO
            {
                ImageUrl = i.ImageUrl,
                IsMain = i.IsMain ?? false,
            }).ToList(),
            Variants = p.ProductVariants.Select(v => new ProductVariantDTO
            {
                Weight = v.Weight,
                Price = v.Price,
                Stock = v.Stock
            }).ToList()
        };
    }

    // CREATE
    public async Task<ProductDTO> Create(CreateProductDTO dto)
    {
        if (dto == null)
            return null;

        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            CategoryId = dto.CategoryId,
            ProductImages = new List<ProductImage>(),
            ProductVariants = new List<ProductVariant>()
        };

        // =========================
        // 👉 1. XỬ LÝ ẢNH
        // =========================
        if (dto.Images != null && dto.Images.Files != null && dto.Images.Files.Any())
        {
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            foreach (var file in dto.Images.Files)
            {
                if (!file.ContentType.StartsWith("image/"))
                    continue;

                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var path = Path.Combine(folder, fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                product.ProductImages.Add(new ProductImage
                {
                    ImageUrl = "/images/" + fileName,
                    IsMain = false
                });
            }

            // 👉 set ảnh đầu tiên làm main
            if (product.ProductImages.Any())
            {
                product.ProductImages.First().IsMain = true;
            }
        }

        if (dto.Variants != null && dto.Variants.Any())
        {
            foreach (var v in dto.Variants)
            {
                product.ProductVariants.Add(new ProductVariant
                {
                    Weight = v.Weight,
                    Price = v.Price,
                    Stock = v.Stock
                });
            }
        }


        db.Products.Add(product);
        await db.SaveChangesAsync();


        return new ProductDTO
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            CategoryName = null, // vì chưa include

            urlImgMain = product.ProductImages
                .FirstOrDefault(x => x.IsMain == true)?.ImageUrl
        };
    }

    // UPDATE
    public async Task<bool> Update(int id, CreateProductDTO dto)
    {
        var product = await db.Products.FindAsync(id);
        if (product == null) return false;

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.CategoryId = dto.CategoryId;

        await db.SaveChangesAsync();
        return true;
    }

    // DELETE
    public async Task<bool> Delete(int id)
    {
        var product = await db.Products
        .Include(p => p.ProductImages)
        .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return false;

        // 🔥 1. Xoá file vật lý
        foreach (var img in product.ProductImages)
        {
            var fullPath = Path.Combine("wwwroot", img.ImageUrl!.TrimStart('/'));

            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
        }

        // 🔥 2. Xoá DB
        db.ProductImages.RemoveRange(product.ProductImages);
        db.ProductVariants.RemoveRange(product.ProductVariants);
        db.Products.Remove(product);


        await db.SaveChangesAsync();

        return true;
    }
}