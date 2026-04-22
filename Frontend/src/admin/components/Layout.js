import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const routeMeta = [
  {
    match: (pathname) => pathname === "/",
    eyebrow: "Cafe control",
    title: "Tong quan van hanh",
  },
  {
    match: (pathname) => pathname.startsWith("/users"),
    eyebrow: "Team & customers",
    title: "Quan ly nguoi dung",
  },
  {
    match: (pathname) => pathname.startsWith("/categories"),
    eyebrow: "Product structure",
    title: "Quan ly danh muc",
   
  },
  {
    match: (pathname) => pathname.startsWith("/products/"),
    eyebrow: "Product studio",
    title: "Chi tiet san pham",
  },
  {
    match: (pathname) => pathname.startsWith("/products"),
    eyebrow: "Catalog",
    title: "Kho san pham",
  },
  {
    match: (pathname) => pathname.startsWith("/orders/"),
    eyebrow: "Fulfillment",
    title: "Chi tiet don hang",
  },
  {
    match: (pathname) => pathname.startsWith("/orders"),
    eyebrow: "Order flow",
    title: "Theo doi don hang",
  }
];

function getRouteMeta(pathname) {
  return routeMeta.find((item) => item.match(pathname)) || routeMeta[0];
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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
