import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5224/api/order/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data.data || data);
      });
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chi tiết đơn hàng #{order.id}</h2>

      <p>User ID: {order.userId}</p>
      <p>Trạng thái: {order.status}</p>
      <p>Tổng tiền: {order.totalAmount?.toLocaleString()} đ</p>

      <h3>Sản phẩm đã mua:</h3>

      <table style={table}>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
          </tr>
        </thead>

        <tbody>
          {order.items?.map((item) => (
            <tr key={item.id}>
              <td>{item.productName||"Chưa có tên"}</td>
              <td>{item.quantity}</td>
              <td>{item.price?.toLocaleString()} đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff"
};