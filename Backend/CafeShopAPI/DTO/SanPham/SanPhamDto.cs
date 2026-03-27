
namespace CafeShopAPI.DTOs.SanPham;

public class SanPhamDto
{
    public int Id { get; set; }
    public string TenSanPham { get; set; } = null!;
    public string? MoTa { get; set; }
    public int? DanhMucId { get; set; }

    public List<HinhAnhDto>? HinhAnhs { get; set; }
}


