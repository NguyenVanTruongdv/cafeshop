using CafeShopAPI.DTO.Order;
using CafeShopAPI.Models;
using CafeShopAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlTypes;

namespace CafeShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class OrderController(IOrderRepository repo) : ControllerBase
    {
        [HttpGet("{orderId:int}")]
        public async Task<IActionResult> GetById(int orderId)
        {
            var order = await repo.GetOrderByIdAsync(orderId);
            if (order == null)
            {
                return NotFound(ApiResponse<string>.FailNotFound("Order not found"));
            }
            var result = MapToOrderResponse(order);
            return Ok(ApiResponse<OrderResponse>.Ok(result));
        }
        [HttpGet("user/{userId:int}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var order = await repo.GetOrderByUserIdAsync(userId);
            var result = order.Select(MapToOrderResponse);
            return Ok(ApiResponse<IEnumerable<OrderResponse>>.Ok(result));
        }
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout(CreateOrderRequest request)
        {
            var order = await repo.CreateOrderFromCartAsync(
                request.UserId,
                request.AddressId
            );

            var result = MapToOrderResponse(order);

            return Ok(ApiResponse<OrderResponse>.Ok(result, "Order created successfully"));
        }

        private OrderResponse MapToOrderResponse(Order order)
        {
            return new OrderResponse
            {
                Id = order.Id,
                UserId = order.UserId,
                AddressId = order.AddressId,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                PaymentMethod = order.PaymentMethod,
                Items = order.OrderDetails.Select(od => new OrderItemResponse
                {
                    Id = od.Id,
                    VariantId = od.VariantId,
                    Quantity = od.Quantity,
                    Price = od.Price,
                    ProductName = od.Variant?.Product?.Name??"N/A"
                }).ToList()
            };
        }
    }
} 
