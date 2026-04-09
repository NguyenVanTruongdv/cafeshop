using CafeShopAPI.Services;
using CafeShopAPI.Services.Interface;

namespace CafeShopAPI
{
    public static class ServiceRegistration
    {
        public static void AddInfrastructure (this IServiceCollection services)
        {
            services.AddTransient<ICartRepository, CartRepository>();
            services.AddTransient<IOrderRepository,OrderRepository>();
        }
    }
}
