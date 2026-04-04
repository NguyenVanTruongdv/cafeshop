
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import {
  Table, TableHead, TableRow, TableCell, TableBody, Button, Paper
} from "@mui/material";

export default function Products() {
  const { products, deleteProduct } = useContext(ProductContext);
const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Quản lý sản phẩm</h2>
        <input
  type="text"
  placeholder="Tìm sản phẩm..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    margin: "10px 0"
  }}
/>
        <Link to="/products/add">
          <Button variant="contained">+ Thêm</Button>
        </Link>
      </div>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Giá lẻ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
  {products
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(p => (
      <TableRow key={p.id}>
        <TableCell>{p.name}</TableCell>
        <TableCell>{p.retailPrice.toLocaleString()} đ</TableCell>
        <TableCell>{p.status}</TableCell>
        <TableCell>
          <Link to={`/products/edit/${p.id}`}>
            <Button size="small">Sửa</Button>
          </Link>
          <Button
            size="small"
            color="error"
            onClick={() => deleteProduct(p.id)}
          >
            Xóa
          </Button>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

        </Table>
      </Paper>
    </div>
  );
}