using CafeShopAPI.Models;

namespace CafeShopAPI.Services.Interface
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<Order?> GetOrderByIdAsync(int orderId);
        Task<List<Order>> GetOrderByUserIdAsync(int userId);
        Task<Order> CreateOrderFromCartAsync(int userId,int addressId);
    }
}
