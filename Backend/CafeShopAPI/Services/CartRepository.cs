using CafeShopAPI.Data;
using CafeShopAPI.Models;
using CafeShopAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace CafeShopAPI.Services
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;
        public CartRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<int> AddAsync(Cart entity)
        {
            await _context.Carts.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }
        public async Task<int> UpdateAsync(Cart entity)
        {
            _context.Carts.Update(entity);
            return await _context.SaveChangesAsync();
        }
        public async Task<int> DeleteAsync(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return 0;
            }
            _context.Carts.Remove(cart);
            return await _context.SaveChangesAsync();
        }
        public async Task<Cart?> GetByIdAsync(int id)
        {
            return await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Variant)
                .ThenInclude(v => v.Product)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task<IReadOnlyList<Cart>> GetAllAsync()
        {
            return await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Variant)
                .ThenInclude(v => v.Product)
                .ToListAsync();
        }
        public async Task<Cart?> GetCartByUserIdAsync(int userId)
        {
            return await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Variant)
                .ThenInclude(v => v.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);
        }
        public async Task<CartItem> AddItemToCartAsync(int userId, int variantId, int quantity)
        {
            var cart = await GetCartByUserIdAsync(userId);
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId
                };
                await _context.Carts.AddAsync(cart);
                await _context.SaveChangesAsync();
            }
            var existingItem = cart.CartItems.FirstOrDefault(ci => ci.VariantId == variantId);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
            else
            {
                var newItem = new CartItem
                {
                    CartId = cart.Id,
                    VariantId = variantId,
                    Quantity = quantity
                };
                cart.CartItems.Add(newItem);
            }
            await _context.SaveChangesAsync();
            return cart.CartItems.First(ci => ci.VariantId == variantId);
        }
        public async Task<CartItem?> UpdateItemQuantityAsync(int cartItemId, int quantity)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            if (item == null)
            {
                return null;
            }
            item.Quantity = quantity;
            await _context.SaveChangesAsync();
            return item;
        }
        public async Task<bool> RemoveItemFromCartAsync(int cartItemId)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            if (item==null)
            {
                return false;
            }
            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> ClearCartAsync(int userId)
        {
            var cart= await GetCartByUserIdAsync(userId);
            if (cart == null)
            {
                return false;
            }
            _context.CartItems.RemoveRange(cart.CartItems);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
