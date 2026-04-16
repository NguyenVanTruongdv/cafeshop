import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

function formatCurrency(value) {
  return moneyFormatter.format(value || 0);
}

export default function Orders() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5224/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data || data);
      })
      .catch(() => {
        setUsers([
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" }
        ]);
      });
  }, []);

  const loadOrders = (userId) => {
    fetch(`http://localhost:5224/api/order/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.data || []);
      });
  };

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);

    if (userId) {
      loadOrders(userId);
      return;
    }

    setOrders([]);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const totalAmount = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  }, [orders]);

  const completedCount = orders.filter((order) => {
    const status = (order.status || "").toLowerCase();
    return ["done", "paid", "completed", "success", "delivered"].includes(status);
  }).length;

  return (
    <div className="page-shell">
      <section className="page-banner page-banner--coffee">
        <div className="page-banner__content">
          <span className="hero-badge">Order flow</span>
        </div>

        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span>So don dang xem</span>
            <strong>{orders.length}</strong>
            <small>{selectedUser ? `User ${selectedUser}` : "Chon user de load du lieu"}</small>
          </div>
          <div className="hero-stat">
            <span>Tong gia tri</span>
            <strong>{formatCurrency(totalAmount)}</strong>
            <small>Cong don cac don dang hien thi</small>
          </div>
          <div className="hero-stat">
            <span>Don hoan tat</span>
            <strong>{completedCount}</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="toolbar toolbar--space-between toolbar--wrap">
          <div className="toolbar__group toolbar__group--grow">
            <label className="field field--inline">
              <span>Chon user</span>
              <select className="input-control" value={selectedUser} onChange={handleUserChange}>
                <option value="">-- Chon user --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.email}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="toolbar__group">
            <span className="status-badge status-badge--neutral">{users.length} user</span>
            <span className="status-badge status-badge--accent">{orders.length} order</span>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ma don hang</th>
                <th>User ID</th>
                <th>Trang thai</th>
                <th>Tong tien</th>
                <th>Tac vu</th>
              </tr>
            </thead>

            <tbody>
              {orders.length ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => navigate(`/orders/${order.id}`)}
                      >
                        #{order.id}
                      </button>
                    </td>
                    <td>{order.userId}</td>
                    <td>
                      <span className="status-badge status-badge--success">
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn--danger btn--small"
                        onClick={() => handleDelete(order.id)}
                      >
                        Xoa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="empty-state empty-state--table">
                      <strong>{selectedUser ? "User nay chua co don" : "Hay chon mot user"}</strong>
                      <p>
                        {selectedUser
                          ? "Khi API tra ve don hang, bang nay se tu lap day."
                          : "Dropdown ben tren se giup ban tai danh sach don theo tung khach hang."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
