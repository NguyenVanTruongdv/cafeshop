
public class ProductVariantDTO
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string? ProductName { get; set; }

    public string? Weight { get; set; }
    public decimal? Price { get; set; }
    public int? Stock { get; set; }
}