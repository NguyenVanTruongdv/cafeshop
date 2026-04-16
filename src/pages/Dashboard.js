import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5224/api/products").then(r => r.json()),
      fetch("http://localhost:5224/api/order/user/2").then(r => r.json())
    ]).then(([products, orders]) => {
      const productList = products.data || products;
      const orderList = orders.data || [];

      const revenue = orderList.reduce(
        (sum, o) => sum + (o.totalAmount || 0),
        0
      );

      setStats({
        products: productList.length,
        orders: orderList.length,
        revenue
      });
      const chart = orderList.map((o, i) => ({
        name: "Order " + (i + 1),
        value: o.totalAmount
      }));

      setChartData(chart);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <Card title="Revenue" value={stats.revenue + " đ"} color="#22c55e" />
        <Card title="Orders" value={stats.orders} color="#3b82f6" />
        <Card title="Products" value={stats.products} color="#f59e0b" />
      </div>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={box}>
          <h3>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div style={box}>
          <h3>Orders</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ===== CARD =====
function Card({ title, value, color }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      <p style={{ color: "#888" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

// ===== BOX =====
const box = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};