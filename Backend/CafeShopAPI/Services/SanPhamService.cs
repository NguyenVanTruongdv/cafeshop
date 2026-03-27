using Microsoft.EntityFrameworkCore;
using CafeShopAPI.Data;
using CafeShopAPI.Models;

namespace CafeShopAPI.Services
{
    public class SanPhamService
    {
        private readonly AppDbContext _db;

        public SanPhamService (AppDbContext db)
        {
            _db=db;
        }

        public async Task<List<SanPham>> GetAll()
        {
            var data= await _db.SanPhams 
                                .Include(x => x.HinhAnhSanPhams).ToListAsync();
          return data;

        }


    }
}