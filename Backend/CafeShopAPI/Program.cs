using CafeShopAPI.Services;
using Microsoft.EntityFrameworkCore;
using CafeShopAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// =======================
// ADD SERVICES
// =======================

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
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

// DI Services
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<ProductVariantService>();
builder.Services.AddScoped<ProductImageService>();

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Static files (ảnh)
app.UseStaticFiles();

app.UseCors("AllowAll");

// HTTPS
app.UseHttpsRedirection();

// Auth (nếu có)
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Test API
app.MapGet("/ping", () => Results.Ok("API is alive"));

app.Run();