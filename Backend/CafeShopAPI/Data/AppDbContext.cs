using System;
using System.Collections.Generic;
using CafeShopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeShopAPI.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BienTheSanPham> BienTheSanPhams { get; set; }

    public virtual DbSet<DanhMuc> DanhMucs { get; set; }

    public virtual DbSet<HinhAnhSanPham> HinhAnhSanPhams { get; set; }

    public virtual DbSet<SanPham> SanPhams { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<BienTheSanPham>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("bien_the_san_pham");

            entity.HasIndex(e => e.SanPhamId, "fk_bienthe_sanpham");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Gia)
                .HasPrecision(10, 2)
                .HasColumnName("gia");
            entity.Property(e => e.SanPhamId).HasColumnName("san_pham_id");
            entity.Property(e => e.TenBienThe)
                .HasMaxLength(255)
                .HasColumnName("ten_bien_the");

            entity.HasOne(d => d.SanPham).WithMany(p => p.BienTheSanPhams)
                .HasForeignKey(d => d.SanPhamId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_bienthe_sanpham");
        });

        modelBuilder.Entity<DanhMuc>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("danh_muc");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.TenDanhMuc)
                .HasMaxLength(255)
                .HasColumnName("ten_danh_muc");
        });

        modelBuilder.Entity<HinhAnhSanPham>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("hinh_anh_san_pham");

            entity.HasIndex(e => e.SanPhamId, "fk_hinhanh_sanpham");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.LaAnhChinh).HasColumnName("la_anh_chinh");
            entity.Property(e => e.SanPhamId).HasColumnName("san_pham_id");
            entity.Property(e => e.Url)
                .HasMaxLength(500)
                .HasColumnName("url");

            entity.HasOne(d => d.SanPham).WithMany(p => p.HinhAnhSanPhams)
                .HasForeignKey(d => d.SanPhamId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_hinhanh_sanpham");
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("san_pham");

            entity.HasIndex(e => e.DanhMucId, "fk_sanpham_danhmuc");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DanhMucId).HasColumnName("danh_muc_id");
            entity.Property(e => e.MoTa)
                .HasColumnType("text")
                .HasColumnName("mo_ta");
            entity.Property(e => e.TenSanPham)
                .HasMaxLength(255)
                .HasColumnName("ten_san_pham");

            entity.HasOne(d => d.DanhMuc).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.DanhMucId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_sanpham_danhmuc");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Lop)
                .HasMaxLength(50)
                .HasColumnName("lop");
            entity.Property(e => e.Mssv)
                .HasMaxLength(50)
                .HasColumnName("mssv");
            entity.Property(e => e.Ten)
                .HasMaxLength(255)
                .HasColumnName("ten");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
