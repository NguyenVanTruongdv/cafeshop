using CafeShopAPI.Services;
using Microsoft.EntityFrameworkCore;
using CafeShopAPI.Data;
using CafeShopAPI;
// using CafeShopAPI.Services;
var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();
//
builder.Services.AddInfrastructure();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS - Allow ALL domains
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<CategoryService>();

var app = builder.Build();


// Enable CORS
app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/ping", () =>
{
    return Results.Ok("API is alive");
});
app.Run();