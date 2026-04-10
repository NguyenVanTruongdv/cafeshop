using CafeShopAPI;
using CafeShopAPI.Data;
using CafeShopAPI.DTOs;
using CafeShopAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// =======================
// ADD SERVICES
// =======================

// Controllers
builder.Services.AddControllers();

// Infrastructure (nếu bạn có extension này)
builder.Services.AddInfrastructure();

// =======================
// JWT AUTH
// =======================
var jwtKey = builder.Configuration["Jwt:Key"];

builder.Services.AddAuthentication(Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.UTF8.GetBytes(jwtKey);

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddAuthorization();

// =======================
// DATABASE (Railway MySQL)
// =======================
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// =======================
// SERVICES (DI)
// =======================
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AddressService>();

builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<ProductVariantService>();
builder.Services.AddScoped<ProductImageService>();

builder.Services.AddHttpContextAccessor();

// =======================
// AUTOMAPPER
// =======================
builder.Services.AddAutoMapper(typeof(MappingProfile));

// =======================
// SWAGGER
// =======================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// =======================
// CORS
// =======================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// =======================
// MIDDLEWARE
// =======================

app.UseSwagger();
app.UseSwaggerUI();

app.UseStaticFiles();

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Test API
app.MapGet("/ping", () => "API is alive");

app.Run();