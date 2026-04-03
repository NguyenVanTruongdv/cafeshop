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
const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
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
       <Route path="/lich-su-don-hang" element={<LichSuDonHang />} />
       <Route path="/lich-su-don-hang/:id" element={<ChiTietDonHang />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;