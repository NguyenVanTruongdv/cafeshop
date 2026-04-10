using CafeShopAPI.Data;
using CafeShopAPI.Models;
using CafeShopAPI.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace CafeShopAPI.Services
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;
        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Order?> GetByIdAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            return order;
        }
        public async Task<IReadOnlyList<Order>> GetAllAsync()
        {
            return await _context.Orders.ToListAsync();
        }
        public async Task<int> AddAsync(Order entity)
        {
            await _context.Orders.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }
        public async Task<int> UpdateAsync(Order entity)
        {
            _context.Orders.Update(entity);
            return await _context.SaveChangesAsync();
        }
        public async Task<int> DeleteAsync(int id)
        {
            var order= await _context.Orders.FindAsync(id);
            if (order==null)
            {
                return 0;
            }
            _context.Orders.Remove(order);
            return await _context.SaveChangesAsync();
        }
        public async Task<Order?> GetOrderByIdAsync(int orderId)
        {
            return await _context.Orders
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Variant)
                .ThenInclude(v => v.Product)
                .FirstOrDefaultAsync(o=>o.Id==orderId);
        }
        public async Task<List<Order>> GetOrderByUserIdAsync(int userId)
        {
            return await _context.Orders
                .Where(o=>o.UserId==userId)
                .Include(o => o.OrderDetails)
                .OrderByDescending(o=>o.Id)
                .ToListAsync();
        }
        public async Task<Order> CreateOrderFromCartAsync(int userId, int addressId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Variant)
                .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart==null||!cart.CartItems.Any())
            {
                throw new Exception("Cart is Empty");
            }
            var order = new Order
            {
                UserId = userId,
                AddressId = addressId,
                Status = "Pending",
                PaymentMethod = "COD",
                OrderDetails = new List<OrderDetail>()
            };
            decimal total= 0;
            foreach (var ci in cart.CartItems)
            {
                var price = ci.Variant.Price ?? 0;
                var detail = new OrderDetail
                {
                    VariantId = ci.VariantId,
                    Quantity = ci.Quantity,
                    Price = price
                };
                total += price * ci.Quantity;
                order.OrderDetails.Add(detail);
            }
            order.TotalAmount = total;
            await _context.Orders.AddAsync(order);
            _context.CartItems.RemoveRange(cart.CartItems);
            await _context.SaveChangesAsync();
            return order;
        }

    }
}
