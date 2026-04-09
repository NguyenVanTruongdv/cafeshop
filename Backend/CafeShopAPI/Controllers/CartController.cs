using CafeShopAPI.Data;
using CafeShopAPI.DTO.Cart;
using CafeShopAPI.Models;
using CafeShopAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CafeShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController(ICartRepository repo) : ControllerBase
    {
        [HttpGet("user/{userId:int}")]
        public async Task<IActionResult> GetCartByUserId(int userId)
        {
            var cart = await repo.GetCartByUserIdAsync(userId);

            if (cart == null)
                return NotFound(ApiResponse<CartResponse>.FailNotFound("Cart not found"));

            var result = MapToCartResponse(cart);

            return Ok(ApiResponse<CartResponse>.Ok(result));
        }
        [HttpPost("add-item")]
        public async Task<IActionResult> AddItem(AddCartItemRequest request)
        {
            var item = await repo.AddItemToCartAsync(
                request.UserId,
                request.VariantId,
                request.Quantity
            );

            var result = MapToCartItemResponse(item);

            return Ok(ApiResponse<CartItemResponse>.Ok(result));
        }
        [HttpPut("update-item")]
        public async Task<IActionResult> UpdateItem(UpdateCartItemRequest request)
        {
            var item = await repo.UpdateItemQuantityAsync(
                request.CartItemId,
                request.Quantity
            );

            if (item == null)
                return NotFound(ApiResponse<string>.FailNotFound("Cart item not found"));

            var result = MapToCartItemResponse(item);

            return Ok(ApiResponse<CartItemResponse>.Ok(result));
        }
        [HttpDelete("remove-item/{cartItemId:int}")]
        public async Task<IActionResult> RemoveItem(int cartItemId)
        {
            var success = await repo.RemoveItemFromCartAsync(cartItemId);

            if (!success)
                return NotFound(ApiResponse<string>.FailNotFound("Cart item not found"));

            return Ok(ApiResponse<string>.Ok("Item removed"));
        }    
        private CartItemResponse MapToCartItemResponse(CartItem ci)
        {
            return new CartItemResponse
            {
                Id = ci.Id,
                CartId = ci.CartId,
                VariantId = ci.VariantId,
                Quantity = ci.Quantity,
                ProductName = ci.Variant?.Product?.Name,
                Price = ci.Variant?.Price ?? 0
            };
        }
        private CartResponse MapToCartResponse(Cart cart)
        {
            return new CartResponse
            {
                Id = cart.Id,
                UserId = cart.UserId,
                CartItems = cart.CartItems.Select(ci => new CartItemResponse
                {
                    Id = ci.Id,
                    CartId = ci.CartId,
                    VariantId = ci.VariantId,
                    Quantity = ci.Quantity,
                    ProductName = ci.Variant?.Product?.Name,
                    Price = ci.Variant?.Price ?? 0
                }).ToList()
            };
        }
    }

}
