using System.Text.Json.Serialization;

namespace CafeShopAPI.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserRole
    {
        Admin, 
        Customer
    }
}
