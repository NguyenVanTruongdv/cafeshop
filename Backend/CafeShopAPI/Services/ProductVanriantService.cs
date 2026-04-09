using Microsoft.EntityFrameworkCore;
using CafeShopAPI.Models;
using CafeShopAPI.Data;
using CafeShopAPI.DTOs;

public class ProductVariantService 
{
    private readonly AppDbContext db;

    public ProductVariantService(AppDbContext _db)
    {
        db = _db;
    }

    // GET ALL
    public async Task<List<ProductVariantDTO>> GetAll()
    {
        var variants = await db.ProductVariants
            .Include(v => v.Product)
            .ToListAsync();

        return variants.Select(v => new ProductVariantDTO
        {
            Id = v.Id,
            ProductId = v.ProductId,
            ProductName = v.Product?.Name,
            Weight = v.Weight,
            Price = v.Price,
            Stock = v.Stock
        }).ToList();
    }

    // GET BY ID
    public async Task<ProductVariantDTO?> GetById(int id)
    {
        var v = await db.ProductVariants
            .Include(v => v.Product)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (v == null) return null;

        return new ProductVariantDTO
        {
            Id = v.Id,
            ProductId = v.ProductId,
            ProductName = v.Product?.Name,
            Weight = v.Weight,
            Price = v.Price,
            Stock = v.Stock
        };
    }

    // CREATE
    public async Task<ProductVariantDTO> Create(CreateProductVariantDTO dto)
    {
        var variant = new ProductVariant
        {
            ProductId = dto.ProductId,
            Weight = dto.Weight,
            Price = dto.Price,
            Stock = dto.Stock
        };

        db.ProductVariants.Add(variant);
        await db.SaveChangesAsync();

        // load product name
        var product = await db.Products.FindAsync(dto.ProductId);

        return new ProductVariantDTO
        {
            Id = variant.Id,
            ProductId = variant.ProductId,
            ProductName = product?.Name,
            Weight = variant.Weight,
            Price = variant.Price,
            Stock = variant.Stock
        };
    }

    // UPDATE
    public async Task<bool> Update(int id, CreateProductVariantDTO dto)
    {
        var variant = await db.ProductVariants.FindAsync(id);
        if (variant == null) return false;

        variant.ProductId = dto.ProductId;
        variant.Weight = dto.Weight;
        variant.Price = dto.Price;
        variant.Stock = dto.Stock;

        await db.SaveChangesAsync();
        return true;
    }

    // DELETE
    public async Task<bool> Delete(int id)
    {
        var variant = await db.ProductVariants.FindAsync(id);
        if (variant == null) return false;

        db.ProductVariants.Remove(variant);
        await db.SaveChangesAsync();
        return true;
    }
}