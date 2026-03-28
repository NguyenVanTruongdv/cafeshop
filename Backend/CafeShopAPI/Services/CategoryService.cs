using Microsoft.EntityFrameworkCore; 
using CafeShopAPI.DTO;
using CafeShopAPI.Models;
using CafeShopAPI.Data;

namespace CafeShopAPI.Services
{
    public class CategoryService
    {
        private readonly AppDbContext db;
        public CategoryService (AppDbContext _db)
        {
            db=_db;
        }

        public async Task<List<CategoryDTO>> GetAll()
        {
            return await db.Categories.Select(c => new CategoryDTO
            {
                Id=c.Id,
                Name=c.Name,
                Description=c.Description

            }).ToListAsync();
        }
        public async Task<CategoryDTO> GetByID(int id)
        {
           return await db.Categories.Where(c => c.Id == id).Select(c => new CategoryDTO
            {
                Id=c.Id,
                Name=c.Name,
                Description = c.Description ?? "",
            }).FirstOrDefaultAsync();
       
        }
        public async Task<bool> Create(CreateCategoryDTO dto)
        {
            var exits = await  db.Categories.AnyAsync(x=>x.Name.ToLower()==dto.Name.ToLower());
            if(exits)
                return false;
            
            var category= new Category
            {
                Name=dto.Name,
                Description=dto.Description
            };
            db.Categories.Add(category);
            await db.SaveChangesAsync();
            return true;

        }
        public async Task<bool> Update(int id, CreateCategoryDTO dto)
        {
            var category= await db.Categories.FindAsync(id);
            if (category == null)
                return false;
            
            category.Name=dto.Name;
            category.Description=dto.Description;
            
            await db.SaveChangesAsync();
            return true;
            
        }
        public async  Task<bool> Delete(int id)
        {
            var category = await db.Categories.FindAsync(id);
            if(category==null)
                return false;
            
            db.Categories.Remove(category);
            await db.SaveChangesAsync();
            return true;
        }
    }
}