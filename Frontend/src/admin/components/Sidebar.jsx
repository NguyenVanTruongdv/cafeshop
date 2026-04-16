import { NavLink, useNavigate } from "react-router-dom";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    label: "Tong quan",
    path: "/admin",
    Icon: SpaceDashboardRoundedIcon,
    description: "Doanh thu va hieu suat",
    end: true
  },
  {
    label: "Nguoi dung",
    path: "/admin/users",
    Icon: GroupRoundedIcon,
    description: "Tai khoan va vai tro"
  },
  {
    label: "Danh muc",
    path: "/admin/categories",
    Icon: CategoryRoundedIcon,
    description: "Nhom san pham"
  },
  {
    label: "San pham",
    path: "/admin/products",
    Icon: Inventory2RoundedIcon,
    description: "Kho mat hang"
  },
  {
    label: "Don hang",
    path: "/admin/orders",
    Icon: ReceiptLongRoundedIcon,
    description: "Dong xu ly don"
  }
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/dang-nhap?mode=login", { replace: true });
  };

  return (
    <aside className={`sidebar${open ? " is-open" : ""}`}>
      <div className="sidebar__brand">
        <div className="sidebar__brand-mark">
          <LocalCafeRoundedIcon fontSize="small" />
        </div>

        <div>
          <span className="sidebar__eyebrow">Admin studio</span>
          <h2>Cafe Material</h2>
        </div>
      </div>

      <div className="sidebar__panel">
        <span className="sidebar__chip">Bang dieu khien truc quan</span>
      </div>

      <nav className="sidebar__nav" aria-label="Dieu huong chinh">
        {menu.map(({ label, path, Icon, description, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__link${isActive ? " sidebar__link--active" : ""}`
            }
          >
            <span className="sidebar__icon">
              <Icon fontSize="small" />
            </span>

            <span className="sidebar__copy">
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__chip sidebar__chip--muted"
          onClick={handleLogout}
        >
          Đăng Xuất
        </button>
      </div>
    </aside>
  );
}
