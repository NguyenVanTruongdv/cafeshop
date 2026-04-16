import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts";

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

function formatCurrency(value) {
  return moneyFormatter.format(value || 0);
}

function MetricCard({ label, value, caption, tone }) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <span className="metric-card__label">{label}</span>
      <strong className="metric-card__value">{value}</strong>
      <p className="metric-card__caption">{caption}</p>
      <div className="metric-card__glow" />
    </article>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5224/api/products").then((response) => response.json()),
      fetch("http://localhost:5224/api/order/user/2").then((response) => response.json())
    ]).then(([products, orders]) => {
      const productList = products.data || products;
      const orderList = orders.data || [];
      const revenue = orderList.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

      setStats({
        products: productList.length,
        orders: orderList.length,
        revenue
      });

      setChartData(
        orderList.map((order, index) => ({
          name: `Order ${index + 1}`,
          value: order.totalAmount || 0
        }))
      );
    });
  }, []);

  const averageOrderValue = stats.orders ? stats.revenue / stats.orders : 0;
  const strongestOrder = useMemo(() => {
    if (!chartData.length) {
      return null;
    }

    return chartData.reduce((best, current) =>
      current.value > best.value ? current : best
    );
  }, [chartData]);
  const recentOrders = chartData.slice(-4).reverse();

  return (
    <div className="page-shell">
      <section className="page-banner page-banner--coffee">
        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>Doanh thu hom nay</span>
            <strong>{formatCurrency(stats.revenue)}</strong>
            <small>Cap nhat tu don hang da co</small>
          </div>
          <div className="hero-stat">
            <span>Gia tri don trung binh</span>
            <strong>{formatCurrency(averageOrderValue)}</strong>
            <small>Lay tong doanh thu chia cho tong so don</small>
          </div>
          <div className="hero-stat">
            <span>Don noi bat</span>
            <strong>{strongestOrder ? strongestOrder.name : "Chua co"}</strong>
            <small>
              {strongestOrder ? formatCurrency(strongestOrder.value) : "Cho du lieu don hang"}
            </small>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <MetricCard
          label="Tong doanh thu"
          value={formatCurrency(stats.revenue)}
          caption="Tong gia tri cac don hang dang duoc dashboard theo doi."
          tone="amber"
        />
        <MetricCard
          label="Tong don hang"
          value={stats.orders}
          tone="sage"
        />
        <MetricCard
          label="Tong san pham"
          value={stats.products}
          caption="Catalog da co san de tiep tuc day du thong tin va hinh anh."
          tone="rose"
        />
      </section>

      <section className="chart-grid">
        <article className="panel panel--soft">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Revenue pulse</span>
              <h3>Duong doanh thu</h3>
            </div>
            <p>Nhin nhanh bien dong gia tri don theo tung lan phat sinh.</p>
          </div>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#e8dac5" strokeDasharray="4 6" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6f5b4b", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #ead7bf",
                    background: "#fff9f2"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8f4f24"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#fff6ec", stroke: "#8f4f24", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel panel--soft">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Order value</span>
              <h3>Phan bo gia tri don</h3>
            </div>
  
          </div>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#e8dac5" strokeDasharray="4 6" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6f5b4b", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #ead7bf",
                    background: "#fff9f2"
                  }}
                />
                <Bar dataKey="value" fill="#3f7d6b" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="mini-grid">
        <article className="panel">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Quick glance</span>
              <h3>4 don gan nhat</h3>
            </div>
          </div>

          <div className="summary-list">
            {recentOrders.length ? (
              recentOrders.map((item) => (
                <div key={item.name} className="summary-item">
                  <div>
                    <strong>{item.name}</strong>
                    <span>Gia tri giao dich</span>
                  </div>
                  <b>{formatCurrency(item.value)}</b>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <strong>Chua co du lieu don hang</strong>

              </div>
            )}
          </div>
        </article>

        <article className="panel panel--accent">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Visual upgrade</span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
