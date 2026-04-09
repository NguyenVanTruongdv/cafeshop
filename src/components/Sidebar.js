import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Category", path: "/categories" },
    { name: "Product", path: "/products" },
    { name: "Order", path: "/orders" },
  ];

  return (
    <div
      style={{
        width: "220px",
        background: "#020617",
        color: "white",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h2>Admin</h2>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "block",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px",
            textDecoration: "none",
            color:
              location.pathname === item.path ? "white" : "#94a3b8",
            background:
              location.pathname === item.path ? "#1e293b" : "transparent",
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}