namespace CafeShopAPI.DTO.Order
{
    public class OrderItemResponse
    {
        public int Id { get; set; }
        public int VariantId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }

        public string? ProductName { get; set; }
        public string? Weight { get; set; }     
        public string? ImageUrl { get; set; }
    }
}
