
namespace CafeShopAPI.DTOs.SanPham;

public class CreateSanPhamDto
{
    public string TenSanPham { get; set; } = null!;
    public string? MoTa { get; set; }
    public int? DanhMucId { get; set; }

    public List<CreateHinhAnhDto>? HinhAnhs { get; set; }
}

public class CreateHinhAnhDto
{
    public string? Url { get; set; }
    public bool? LaAnhChinh { get; set; }
}

