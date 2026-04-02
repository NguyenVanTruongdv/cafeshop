



public  class ProductInfoDTO
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? CategoryName {get; set;} 

    public string? urlImgMain {get; set;}

    public List<ProductImgDTO>? Images { get; set; }

     public List<ProductVariantDTO>? Variants { get; set; }


}
