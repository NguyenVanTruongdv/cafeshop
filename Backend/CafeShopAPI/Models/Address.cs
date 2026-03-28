using System;
using System.Collections.Generic;

namespace CafeShopAPI.Models;

public partial class Address
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string? AddressDetail { get; set; }

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User User { get; set; } = null!;
}
