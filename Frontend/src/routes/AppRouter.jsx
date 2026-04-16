// File: src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import TrangChu from '../pages/TrangChu';
import SanPham from '../pages/SanPham';
import GioiThieu from '../pages/GioiThieu';
import BangGia from '../pages/BangGia';
import LienHe from '../pages/LienHe';
import ChiTietSanPham from '../pages/ChiTietSanPham';
import GioHang from '../pages/GioHang';
import DangNhap from '../pages/DangNhap'; 
import ThanhToan from '../pages/ThanhToan';
import LichSuDonHang from '../pages/LichSuDonHang';
import ChiTietDonHang from '../pages/ChiTietDonHang';

// Admin Pages
import AdminLayout from '../admin/components/Layout.jsx';
import AdminDashboard from '../admin/pages/Dashboard.jsx';
import AdminUsers from '../admin/pages/Users.jsx';
import AdminCategories from '../admin/pages/Categories.jsx';
import AdminProducts from '../admin/pages/Products.jsx';
import AdminProductDetail from '../admin/pages/ProductDetail.jsx';
import AdminOrders from '../admin/pages/Orders.jsx';
import AdminOrderDetail from '../admin/pages/OrderDetail.jsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<TrangChu />} />
        <Route path="/" element={<TrangChu />} />
        <Route path="/san-pham" element={<SanPham />} />
        <Route path="/san-pham/:id" element={<ChiTietSanPham />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/bang-gia" element={<BangGia />} />
        <Route path="/lien-he" element={<LienHe />} />
        <Route path="/gio-hang" element={<GioHang />} />
        <Route path="/dang-nhap" element={<DangNhap />} />
        <Route path="/thanh-toan" element={<ThanhToan />} />
        <Route path="/lich-su-don-hang" element={<LichSuDonHang />} />
        <Route path="/lich-su-don-hang/:id" element={<ChiTietDonHang />} />
        <Route path="*" element={<TrangChu />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/:id" element={<AdminProductDetail />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;