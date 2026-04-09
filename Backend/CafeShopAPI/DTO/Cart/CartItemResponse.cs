namespace CafeShopAPI.DTO.Cart
{
    public class CartItemResponse
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int VariantId { get; set; }
        public int Quantity { get; set; }
        public string? ProductName { get; set; }
        public decimal Price { get; set; }
    }
}
