export default function Topbar() {
  return (
    <div style={topbar}>
 
      <div style={left}>
        <span style={dot}></span>
        <h3 style={{ margin: 0 }}>CAFE MATERIAL</h3>
      </div>

      <div style={right}>
        <input
          placeholder="Search..."
          style={search}
        />
        <div style={icon}>🔔</div>
        <div style={icon}>👤</div>
      </div>
    </div>
  );
}

const topbar = {
  height: "60px",
  background: "#3b3f45",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  color: "#fff"
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const dot = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: "#00d1ff"
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const search = {
  padding: "6px 10px",
  borderRadius: "20px",
  border: "none",
  outline: "none",
  width: "180px"
};

const icon = {
  cursor: "pointer",
  fontSize: "18px"
};