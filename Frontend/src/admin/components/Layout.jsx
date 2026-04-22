import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../admin.css";

const routeMeta = [
  {
    match: (pathname) => pathname === "/admin",
    eyebrow: "Cafe control",
    title: "Tong quan van hanh",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/users"),
    eyebrow: "Team & customers",
    title: "Quan ly nguoi dung",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/categories"),
    eyebrow: "Product structure",
    title: "Quan ly danh muc",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/products/"),
    eyebrow: "Product studio",
    title: "Chi tiet san pham",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/products"),
    eyebrow: "Catalog",
    title: "Kho san pham",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/orders/"),
    eyebrow: "Fulfillment",
    title: "Chi tiet don hang",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/orders"),
    eyebrow: "Order flow",
    title: "Theo doi don hang",
  }
];

function getRouteMeta(pathname) {
  return routeMeta.find((item) => item.match(pathname)) || routeMeta[0];
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap?mode=login');
      return;
    }
    if (user && user.role !== 'Admin') {
      navigate('/dang-nhap?mode=login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'Admin') {
    return null;
  }

  const meta = useMemo(() => getRouteMeta(location.pathname), [location.pathname]);

  return (
    <div className={`app-shell${sidebarOpen ? " sidebar-open" : ""}`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Topbar meta={meta} onMenuClick={() => setSidebarOpen((value) => !value)} />

        <main className="app-content">
          <div className="app-content__glow app-content__glow--left" />
          <div className="app-content__glow app-content__glow--right" />
          <Outlet />
        </main>
      </div>

      {sidebarOpen ? (
        <button
          type="button"
          className="app-overlay"
          aria-label="Dong dieu huong"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
    </div>
  );
}
