namespace CafeShopAPI.DTO.Cart
{
    public class AddCartItemRequest
    {
        public int UserId { get; set; }
        public int VariantId { get; set; }
        public int Quantity { get; set; }
    }
}
