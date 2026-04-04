import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const data = [
  { name: "T1", value: 100 },
  { name: "T2", value: 200 },
  { name: "T3", value: 350 },
  { name: "T4", value: 250 },
];

export default function Analytics() {
  return (
    <div>
      <h2>📊 Thống kê</h2>

      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        marginTop: "20px"
      }}>
        <LineChart width={800} height={350} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
      </div>
    </div>
  );
}