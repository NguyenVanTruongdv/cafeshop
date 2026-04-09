namespace CafeShopAPI.DTO.Order
{
    public class OrderResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AddressId { get; set; }
        public decimal? TotalAmount { get; set; }
        public string? Status { get; set; }
        public string? PaymentMethod { get; set; }

        public List<OrderItemResponse> Items { get; set; }
    }
}
