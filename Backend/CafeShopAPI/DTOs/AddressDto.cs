namespace CafeShopAPI.DTOs
{
    public class AddressDto
    {
        public class CreateAddress
        {
            public string AddressDetail { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }

        public class AddressResponse
        {
            public int Id { get; set; }
            public string AddressDetail { get; set; }
            public double Latitude { get; set; }

            public double Longitude { get; set; }
        }
    }
}
