import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { laydonhangbyid } from "../../services/api";

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

function formatCurrency(value) {
  return moneyFormatter.format(value || 0);
}

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await laydonhangbyid(id);
        setOrder(response?.data || response);
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
        alert("Không thể tải đơn hàng.");
      }
    };

    loadOrder();
  }, [id]);

  const totalItems = useMemo(() => {
    return order?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  }, [order]);

  if (!order) {
    return (
      <div className="page-shell">
        <div className="panel">
          <div className="empty-state empty-state--fill">
            <strong>Dang tai thong tin don hang...</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="page-banner page-banner--warm">
        <div className="page-banner__content">
          <span className="hero-badge">Order detail</span>
          <h2>Don hang #{order.id}</h2>
        </div>

        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>User ID</span>
            <strong>{order.userId}</strong>
            <small>Nguoi tao don hang</small>
          </div>
          <div className="hero-stat">
            <span>Trang thai</span>
            <strong>{order.status}</strong>
            <small>Theo du lieu API tra ve</small>
          </div>
          <div className="hero-stat">
            <span>Tong tien</span>
            <strong>{formatCurrency(order.totalAmount)}</strong>
            <small>{totalItems} san pham trong don</small>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel panel--soft">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Summary</span>
              <h3>Thong tin tong quan</h3>
            </div>
          </div>

          <div className="summary-list">
            <div className="summary-item">
              <div>
                <strong>Ma don hang</strong>
                <span>Dinh danh giao dich</span>
              </div>
              <b>#{order.id}</b>
            </div>
            <div className="summary-item">
              <div>
                <strong>So luong san pham</strong>
                <span>Tong quantity trong danh sach</span>
              </div>
              <b>{totalItems}</b>
            </div>
            <div className="summary-item">
              <div>
                <strong>Gia tri thanh toan</strong>
                <span>Tong thanh tien cua don</span>
              </div>
              <b>{formatCurrency(order.totalAmount)}</b>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Items</span>
              <h3>San pham da mua</h3>
            </div>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ten san pham</th>
                  <th>So luong</th>
                  <th>Gia</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.length ? (
                  order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productName || "Chua co ten"}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">
                      <div className="empty-state empty-state--table">
                        <strong>Khong co san pham trong don</strong>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}
