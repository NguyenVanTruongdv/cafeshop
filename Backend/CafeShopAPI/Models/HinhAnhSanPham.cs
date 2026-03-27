using System;
using System.Collections.Generic;

namespace CafeShopAPI.Models;

public partial class HinhAnhSanPham
{
    public int Id { get; set; }

    public int? SanPhamId { get; set; }

    public string? Url { get; set; }

    public bool? LaAnhChinh { get; set; }

    public virtual SanPham? SanPham { get; set; }
}
