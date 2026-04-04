import { TextField, Button } from "@mui/material";

export default function Settings() {
  return (
    <div>
      <h2>⚙️ Cài đặt</h2>

      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        maxWidth: "400px",
        marginTop: "20px"
      }}>
        <TextField fullWidth label="Tên quán" defaultValue="Chất Cafe" />
        <br /><br />
        <TextField fullWidth label="Địa chỉ" />
        <br /><br />
        <TextField fullWidth label="Số điện thoại" />
        <br /><br />

        <Button variant="contained">
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}