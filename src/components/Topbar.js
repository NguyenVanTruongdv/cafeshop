import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";

export default function Topbar({ meta, onMenuClick }) {
  const todayLabel = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  }).format(new Date());

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="icon-button icon-button--menu"
          onClick={onMenuClick}
          aria-label="Mo dieu huong"
        >
          <MenuRoundedIcon fontSize="small" />
        </button>

        <div className="topbar__meta">
          <span className="eyebrow">{meta.eyebrow}</span>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>
      </div>

      <div className="topbar__right">
        <label className="topbar__search" aria-label="Tim kiem nhanh">
          <SearchRoundedIcon fontSize="small" />
          <input placeholder="Tim nhanh san pham, don hang, nguoi dung..." />
        </label>

        <div className="topbar__status">
          <span className="topbar__badge topbar__badge--success">
            <AutoGraphRoundedIcon fontSize="inherit" />
            Store live
          </span>
          <span className="topbar__badge">{todayLabel}</span>
        </div>

        <button type="button" className="icon-button" aria-label="Thong bao">
          <NotificationsRoundedIcon fontSize="small" />
        </button>

        <div className="profile-card">
          <div className="profile-card__avatar">CM</div>
          <div>
            <strong>Admin Team</strong>
            <span>Quan tri van hanh</span>
          </div>
        </div>
      </div>
    </header>
  );
}
