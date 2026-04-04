import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Topbar() {
  return (
    <div style={{
      height: "60px",
      background: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}>
      <h3>Admin Dashboard</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        <NotificationsIcon />
        <AccountCircleIcon />
      </div>
    </div>
  );
}