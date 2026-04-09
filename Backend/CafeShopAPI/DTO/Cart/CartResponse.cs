namespace CafeShopAPI.DTO.Cart
{
    public class CartResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public List<CartItemResponse> CartItems { get; set; } = new();

    }
}
