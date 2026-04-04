const customers = [
  { id: 1, name: "Nguyễn Văn A", phone: "0123456789" },
  { id: 2, name: "Trần Thị B", phone: "0987654321" },
];

export default function Customers() {
  return (
    <div>
      <h2>👥 Khách hàng</h2>

      <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
        {customers.map(c => (
          <div key={c.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}>
            <img
              src={`https://i.pravatar.cc/150?img=${c.id}`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />

            <div>
              <h4>{c.name}</h4>
              <p>{c.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}