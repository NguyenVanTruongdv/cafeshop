import {
  Table, TableHead, TableRow, TableCell, TableBody, Paper
} from "@mui/material";

const orders = [
  { id: 1, customer: "Nguyễn Văn A", total: 250000, status: "Đang giao" },
  { id: 2, customer: "Trần Thị B", total: 180000, status: "Hoàn thành" },
  { id: 3, customer: "Lê Văn C", total: 300000, status: "Chờ xử lý" },
];

export default function Orders() {
  return (
    <div>
      <h2>🧾 Quản lý đơn hàng</h2>

      <Paper style={{ padding: "20px", borderRadius: "16px", marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map(o => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell>{o.total.toLocaleString()} đ</TableCell>
                <TableCell>
                  <span style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    background:
                      o.status === "Hoàn thành" ? "#dcfce7" :
                      o.status === "Đang giao" ? "#dbeafe" :
                      "#fef3c7"
                  }}>
                    {o.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}