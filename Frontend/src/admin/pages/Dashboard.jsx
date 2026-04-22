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
import { laysanpham, laydonhangbyuser, laytatcauser } from "../../services/api";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");
        const [productRes, userRes] = await Promise.all([laysanpham(), laytatcauser()]);
        const productList = productRes?.data || productRes || [];
        const users = userRes?.data || userRes || [];
        const orderResponses = await Promise.all(
          users.map((user) => laydonhangbyuser(user.id).catch(() => ({ data: [] })))
        );
        const orderList = orderResponses.flatMap((orderRes) => orderRes?.data || orderRes || []);
        const revenue = orderList.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

        setStats({
          products: productList.length,
          orders: orderList.length,
          revenue
        });

        setChartData(
          orderList.map((order, index) => ({
            name: `Order #${order.id || index + 1}`,
            value: order.totalAmount || 0
          }))
        );
      } catch (error) {
        console.error("Lỗi tải dashboard:", error);
        setError("Khong the tai du lieu dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
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
      {error ? (
        <section className="panel">
          <div className="empty-state empty-state--fill">
            <strong>{error}</strong>
          </div>
        </section>
      ) : null}

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
