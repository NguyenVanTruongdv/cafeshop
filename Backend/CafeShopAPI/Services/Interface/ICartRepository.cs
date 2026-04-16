using CafeShopAPI.Models;

namespace CafeShopAPI.Services.Interface
{
    public interface ICartRepository : IGenericRepository<Cart>
    {
        Task<Cart?> GetCartByUserIdAsync(int userId);
        Task<CartItem> AddItemToCartAsync(int userId, int variantId, int quantity);
        Task<CartItem?> UpdateItemQuantityAsync(int cartItemId, int quantity);
        Task<bool> RemoveItemFromCartAsync(int cartItemId);
        Task<bool> ClearCartAsync(int userId);
    }
}
