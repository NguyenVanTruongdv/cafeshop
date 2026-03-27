using Microsoft.EntityFrameworkCore;
using CafeShopAPI.Data;
using CafeShopAPI.Models;

namespace CafeShopAPI.Services
{
    public class DanhMucService
    {
        private readonly AppDbContext _db;

        public DanhMucService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<DanhMucDto>> GetAll()
        {
            var item = await _db.DanhMucs.ToListAsync();

            return item.Select(x=> new DanhMucDto 
            {
                Id=x.Id,
                TenDanhMuc=x.TenDanhMuc,
            }).ToList();

        }

        public async Task<DanhMuc?> GetById(int id)
        {
            return await _db.DanhMucs.FindAsync(id);
        }

        public async Task<DanhMuc?> Create(DanhMuc dm)
        {
            // check trùng
            var exist = await _db.DanhMucs
                .AnyAsync(x => x.TenDanhMuc.ToLower() == dm.TenDanhMuc.ToLower());

            if (exist) return null;

          

            _db.DanhMucs.Add(dm);
            await _db.SaveChangesAsync();

            return dm;
        }

        public async Task<DanhMuc?> Update(int id, DanhMuc dm)
        {
            var item = await _db.DanhMucs.FindAsync(id);
            if (item == null) return null;

            // check trùng (trừ chính nó)
            var exist = await _db.DanhMucs
                .AnyAsync(x => x.TenDanhMuc.ToLower() == dm.TenDanhMuc.ToLower() && x.Id != id);

            if (exist) return null;

            item.TenDanhMuc = dm.TenDanhMuc;

            await _db.SaveChangesAsync();

            return item;
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _db.DanhMucs.FindAsync(id);
            if (item == null) return false;

           var hasProduct = await _db.SanPhams.AnyAsync(s=>s.DanhMucId==id);
           if(hasProduct)
                return false;
            _db.DanhMucs.Remove(item);
            await _db.SaveChangesAsync();

            return true;
        }
    }
}