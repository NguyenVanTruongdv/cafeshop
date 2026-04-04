import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 250 },
];

export default function Dashboard() {
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h2>Dashboard Chất Cafe</h2>

      {/* CARD */}
      <div style={{ display: "flex", gap: "20px" }}>
        
        <Card style={{ background: "#6c63ff", color: "#fff" }}>
          <CardContent>
            <Typography>Doanh thu</Typography>
            <Typography variant="h5">23,569đ</Typography>
          </CardContent>
        </Card>

        <Card style={{ background: "#4caf50", color: "#fff" }}>
          <CardContent>
            <Typography>Sản phẩm</Typography>
            <Typography variant="h5">12</Typography>
          </CardContent>
        </Card>

        <Card style={{ background: "#ff9800", color: "#fff" }}>
          <CardContent>
            <Typography>Khách hàng</Typography>
            <Typography variant="h5">6596</Typography>
          </CardContent>
        </Card>

      </div>

      {/* CHART */}
      <div style={{ marginTop: "40px" }}>
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </div>
    </div>
  );
}