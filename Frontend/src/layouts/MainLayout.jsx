import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; 
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const { cartCount } = useContext(CartContext);
  const { isAuthenticated, logout, user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };


  return (
    <div style={s.app}>
      <nav style={s.nav}>
        <div style={s.container}>
          
          <Link to="/" style={s.logoWrapper}>
            <img src="/logo.png" alt="Logo Cafe" style={s.logoImg} />
          </Link>
          
          <div style={s.links}>
            <Link to="/" style={s.link}>TRANG CHỦ</Link>
            <Link to="/gioi-thieu" style={s.link}>GIỚI THIỆU</Link>
            <Link to="/san-pham" style={s.link}>SẢN PHẨM</Link>
            <Link to="/bang-gia" style={s.link}>BẢNG GIÁ</Link>
            <Link to="/lien-he" style={s.link}>LIÊN HỆ</Link>
            <Link to="/lich-su-don-hang" style={s.link}>LỊCH SỬ</Link>
          </div>

          {/* check đăng nhập để hiện nút đăng nhập hoặc menu người dùng */}
          <div style={s.actions} ref={menuRef}>
            {!isAuthenticated ? (
              <>
                <Link to="/dang-nhap?mode=login" style={s.loginBtn}>
                  Đăng nhập
                </Link>
                <Link to="/dang-nhap?mode=register" style={s.registerBtn}>
                  Đăng ký
                </Link>
              </>
            ) : (
              <div style={s.userMenuWrapper}>
                <button
                  style={s.userButton}
                  onClick={() => setMenuOpen((prev) => !prev)}
                  type="button"
                >
                  <span style={{ fontSize: '18px' }}>👤</span>
                </button>
                {menuOpen && (
                  <div style={s.userDropdown}>
                    <div style={s.dropdownHeader}>
                      {/* HIỂN THỊ TÊN TỪ BACKEND NẾU CÓ */}
                      Xin chào{user?.name ? `, ${user.name}` : ''}!
                    </div>
                    <hr style={s.divider} />
                    <button style={s.dropdownButton} onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <div style={s.separator}></div>
            
            <Link to="/gio-hang" style={s.cartLink} >
              <span style={{ fontSize: '20px' }}>🛒</span>
              {cartCount > 0 && <span style={s.badge}>{cartCount}</span>}
            </Link>
          </div>

        </div>
      </nav>
      <div style={s.content}>
        <Outlet /> 
      </div>
      <Footer />
    </div>
  );
};

const s = {
  app: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#F9F8F3', minHeight: '100vh', color: '#3E2723', display: 'flex', flexDirection: 'column' },
  nav: { backgroundColor: '#720e0e', height: '80px', color: 'white', position: 'sticky', top: 0, zIndex: 1000, display: 'flex', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', width: '100%', gap: '20px' },
  logoWrapper: { display: 'flex', alignItems: 'center', textDecoration: 'none', height: '100%' },
  logoImg: { height: '55px', width: 'auto', display: 'block', objectFit: 'contain' },
  links: { display: 'flex', gap: '30px', alignItems: 'center' },
  link: { color: '#F5F5F5', textDecoration: 'none', fontSize: '14px', fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase', transition: 'color 0.2s' },
  content: { width: '100%', flex: 1 },
  actions: { display: 'flex', gap: '15px', alignItems: 'center' },
  loginBtn: { color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '600', padding: '8px 18px', borderRadius: '24px', border: '1.5px solid rgba(255,255,255,0.7)', transition: 'all 0.2s' },
  registerBtn: { color: '#720e0e', backgroundColor: '#F3C68F', textDecoration: 'none', fontSize: '14px', fontWeight: '700', padding: '9px 20px', borderRadius: '24px', border: 'none', boxShadow: '0 2px 8px rgba(243, 198, 143, 0.4)', transition: 'all 0.2s' },
  userMenuWrapper: { position: 'relative' },
  userButton: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', borderRadius: '50%', width: '42px', height: '42px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' },
  userDropdown: { position: 'absolute', top: 'calc(100% + 12px)', right: 0, minWidth: '180px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', padding: '16px', zIndex: 1000, border: '1px solid #EEEEEE' },
  dropdownHeader: { fontSize: '15px', color: '#3E2723', fontWeight: '600', marginBottom: '8px', textAlign: 'center' },
  divider: { border: 'none', borderTop: '1px solid #E0E0E0', margin: '10px 0' },
  dropdownButton: { width: '100%', padding: '10px 0', borderRadius: '8px', border: '1px solid #ffcccc', backgroundColor: '#fff0f0', color: '#D32F2F', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' },
  separator: { width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.3)', margin: '0 5px' },
  cartLink: { color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', position: 'relative', padding: '5px' },
  badge: { backgroundColor: '#F3C68F', color: '#720e0e', borderRadius: '50%', height: '20px', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', position: 'absolute', top: '-4px', right: '-8px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }
};

export default MainLayout;