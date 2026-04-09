using CafeShopAPI.Services;
using Microsoft.EntityFrameworkCore;
using CafeShopAPI;
﻿using CafeShopAPI.Data;
using CafeShopAPI.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.Text;
// using CafeShopAPI.Data;
// using CafeShopAPI.Services;
var builder = WebApplication.CreateBuilder(args);

// =======================
// ADD SERVICES
// =======================

// Controllers
builder.Services.AddControllers();
//
builder.Services.AddInfrastructure();

// Add services
builder.Services.AddScoped<AuthService>();
builder.Services.AddAuthentication(Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddAuthorization();

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


// builder.Services.AddScoped<DanhMucService>();
// builder.Services.AddScoped<SanPhamService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AddressService>();
builder.Services.AddHttpContextAccessor();

// DTOs
builder.Services.AddAutoMapper(typeof(MappingProfile));
var app = builder.Build();

// Swagger

// Enable CORS
app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

// Static files (ảnh)
app.UseStaticFiles();

app.UseCors("AllowAll");

// HTTPS
app.UseHttpsRedirection();

// Auth (nếu có)

app.UseAuthentication(); // PHẢI có
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Test API
app.MapGet("/ping", () => Results.Ok("API is alive"));

app.Run();