using System;
using System.Collections.Generic;

namespace CafeShopAPI.Models;

public partial class BienTheSanPham
{
    public int Id { get; set; }

    public int? SanPhamId { get; set; }

    public string? TenBienThe { get; set; }

    public decimal? Gia { get; set; }

    public virtual SanPham? SanPham { get; set; }
}
