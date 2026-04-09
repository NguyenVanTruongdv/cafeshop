namespace CafeShopAPI.DTOs
{
    public class ProductImgDTO
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = "";
        public bool IsMain { get; set; }
    }
}