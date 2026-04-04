import { Link, useLocation } from "react-router-dom";

import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {
  const location = useLocation();

  // 🔥 FIX: thêm function này
  const menuItem = (path, label, icon) => (
    <Link
      to={path}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px",
        borderRadius: "10px",
        color: "#fff",
        textDecoration: "none",
        background: location.pathname === path ? "#374151" : "transparent",
        marginBottom: "10px"
      }}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <div style={{
      width: "240px",
      minHeight: "100vh",
      background: "#111827",
      color: "#fff",
      padding: "20px"
    }}>
      <h2>☕ Chất Cafe</h2>

      {menuItem("/", "Dashboard", <DashboardIcon />)}
      {menuItem("/products", "Sản phẩm", <Inventory2Icon />)}
      {menuItem("/orders", "Đơn hàng", <ReceiptIcon />)}
      {menuItem("/customers", "Khách hàng", <PeopleIcon />)}
      {menuItem("/analytics", "Thống kê", <BarChartIcon />)}
      {menuItem("/categories", "Danh mục", <CategoryIcon />)}
      {menuItem("/settings", "Cài đặt", <SettingsIcon />)}

      <hr style={{ margin: "20px 0", borderColor: "#374151" }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer"
        }}
        onClick={() => {
  if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
    window.location.href = "/";
  }
}}
      >
        <LogoutIcon />
        Đăng xuất
      </div>

    </div>
  );
}