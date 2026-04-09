public class CreateProductDTO
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int? CategoryId { get; set; }

    public  UploadProductImageDTO Images {get; set;}
    public List<CreateProductVariantDTO>? Variants {get; set;}
}