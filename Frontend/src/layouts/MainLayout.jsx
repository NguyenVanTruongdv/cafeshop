import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

const MainLayout = () => {
  const { cartCount } = useContext(CartContext);

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
            <Link to="/bang-gia" style={s.link}>BẢNG GIÁ SP & DV</Link>
            <Link to="/lien-he" style={s.link}>LIÊN HỆ</Link>
            <Link to="/lich-su-don-hang" style={s.link}>LỊCH SỬ ĐƠN HÀNG</Link>
          </div>

          <div style={s.actions}>
            <Link to="/dang-nhap" style={s.actionLink}>👤</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <Link to="/gio-hang" style={s.cartLink}>
              🛒 
              <span style={s.badge}>{cartCount}</span>
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
  app: { 
    fontFamily: 'sans-serif', 
    backgroundColor: '#FDFCF0', 
    minHeight: '100vh', 
    color: '#4B2C20', 
    display: 'flex', 
    flexDirection: 'column' 
  },
  nav: { 
    backgroundColor: '#8B0000', 
    height: '65px', 
    color: 'white', 
    position: 'sticky', 
    top: 0, 
    zIndex: 1000, 
    display: 'flex', 
    alignItems: 'center', 
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)' 
  },
  container: { 
    maxWidth: '1200px', 
    margin: '0 auto', 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    padding: '0 20px', 
    width: '100%', 
    gap: '40px' 
  },
  logoWrapper: { 
    display: 'flex', 
    alignItems: 'center', 
    textDecoration: 'none', 
    height: '100%' 
  },
  logoImg: { 
    height: '100px',
    width: 'auto', 
    display: 'block' 
  },
  links: { 
    display: 'flex', 
    gap: '100px',
    alignItems: 'center' 
  },
  link: { 
    color: 'white', 
    textDecoration: 'none', 
    fontSize: '14px', 
    fontWeight: 'bold', 
    letterSpacing: '0.5px' 
  },
  content: { 
    width: '100%', 
    flex: 1 
  },
  
  actions: { 
    display: 'flex', 
    gap: '15px', 
    alignItems: 'center' 
  },
  actionLink: { 
    color: 'white', 
    textDecoration: 'none', 
    fontSize: '14px', 
    fontWeight: 'bold', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '5px' 
  },
  cartLink: { 
    color: 'white', 
    textDecoration: 'none', 
    fontSize: '14px', 
    fontWeight: 'bold', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '5px', 
    position: 'relative' 
  },
  badge: { 
    backgroundColor: '#FFD700', 
    color: '#8B0000', 
    borderRadius: '50%', 
    padding: '2px 6px', 
    fontSize: '11px', 
    position: 'absolute', 
    top: '-10px', 
    right: '-15px', 
    fontWeight: '900' 
  },
  links: { 
    display: 'flex', 
    gap: '30px', 
    alignItems: 'center' 
  },
};

export default MainLayout;