namespace CafeShopAPI.DTO.Product
{
    public class UploadProductImageDTO
    {
        public List<IFormFile> Files { get; set; } = new();
    }
}
