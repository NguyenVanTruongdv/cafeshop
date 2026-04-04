import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div style={{
        flex: 1,
        backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}>
        
        {/* lớp mờ */}
        <div style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(5px)",
          minHeight: "100vh"
        }}>
          
          <Topbar />

          <div style={{ padding: "20px" }}>
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}