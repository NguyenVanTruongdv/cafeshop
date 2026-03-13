using System;
using System.Collections.Generic;

namespace CafeShopAPI.Models;

public partial class User
{
    public int Id { get; set; }

    public string Ten { get; set; } = null!;

    public string Mssv { get; set; } = null!;

    public string Lop { get; set; } = null!;
}
