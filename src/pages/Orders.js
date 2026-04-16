import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5224/api/user") // ⚠️ nếu lỗi thì đổi API
      .then(res => res.json())
      .then(data => {
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
      .then(res => res.json())
      .then(data => {
        setOrders(data.data || []);
      });
  };
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);

    if (userId) {
      loadOrders(userId);
    }
  };
  const handleDelete = (id) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "green" }}>DANH SÁCH ĐƠN HÀNG</h2>
      <div style={{ marginBottom: "15px" }}>
        <label>Chọn User: </label>

        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">-- Chọn user --</option>

          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email}
            </option>
          ))}
        </select>
      </div>
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead style={{ background: "#ddd" }}>
          <tr>
            <th>Mã đơn hàng</th>
            <th>User ID</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
            <th>Tác vụ</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td
  style={{ color: "red", cursor: "pointer" }}
  onClick={() => navigate(`/orders/${o.id}`)}
>
  {o.id}
</td>
              <td>{o.userId}</td>

              <td>{o.status}</td>

              <td>{o.totalAmount?.toLocaleString()} đ</td>

              <td>
                <button
                  onClick={() => handleDelete(o.id)}
                  style={{
                    background: "red",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px"
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}