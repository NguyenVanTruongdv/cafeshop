
namespace CafeShopAPI.DTOs.SanPham;

public class UpdateSanPhamDto
{
    public string TenSanPham { get; set; } = null!;
    public string? MoTa { get; set; }
    public int? DanhMucId { get; set; }

    public List<UpdateHinhAnhDto>? HinhAnhs { get; set; }
}

public class UpdateHinhAnhDto
{
    public int? Id { get; set; }
    public string? Url { get; set; }
    public bool? LaAnhChinh { get; set; }
}
