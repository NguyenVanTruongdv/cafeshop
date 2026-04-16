
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getOrdersByUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const tabs = ['Tất cả', 'Chờ xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy'];

const LichSuDonHang = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State quản lý Menu chính (profile hoặc orders)
  const [activeMenu, setActiveMenu] = useState('orders');
  
  // State quản lý Tab lọc trong mục Đơn mua
  const [activeTab, setActiveTab] = useState('Tất cả');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      setError('');
      try {
        const data = await getOrdersByUser(user.id);
        setOrders(data?.data || []);
      } catch (err) {
        console.error(err);
        setError('Không thể tải lịch sử đơn hàng.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  // Logic lọc đơn hàng
  const filteredOrders = activeTab === 'Tất cả' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      alert("Đã đăng xuất thành công!");
      navigate('/'); 
    }
  };

  // --- VIEW: HỒ SƠ & BẢO MẬT ---
  const ProfileView = () => (
    <div style={styles.viewContainer}>
      <h2 style={styles.viewTitle}>Hồ Sơ & Bảo Mật</h2>
      <p style={styles.viewSub}>Quản lý thông tin tài khoản và mật khẩu của bạn</p>
      <hr style={styles.hr} />

      {/* Form thông tin cá nhân */}
      <div style={styles.formSection}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tên đăng nhập</label>
          <span style={styles.textStatic}>khachhangvip_01</span>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Họ và tên</label>
          <input type="text" defaultValue="Khách Hàng VIP" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" defaultValue="khachhang@gmail.com" style={styles.input} />
        </div>
      </div>

      {/* Form đổi mật khẩu nằm chung luôn */}
      <h3 style={{...styles.viewTitle, fontSize: '18px', marginTop: '30px'}}>Đổi mật khẩu</h3>
      <div style={styles.formSection}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mật khẩu cũ</label>
          <input type="password" placeholder="********" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mật khẩu mới</label>
          <input type="password" style={styles.input} />
        </div>
      </div>

      <button style={styles.btnSave} onClick={() => alert('Đã lưu thay đổi!')}>
        LƯU THAY ĐỔI
      </button>
    </div>
  );

  // --- VIEW: ĐƠN MUA ---
  const OrdersView = () => (
    <>
      <div style={styles.tabsContainer}>
        {tabs.map(tab => (
          <div 
            key={tab} 
            style={{...styles.tab, ...(activeTab === tab ? styles.activeTab : {})}}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {loading ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>⏳</div>
          <p>Đang tải đơn hàng...</p>
        </div>
      ) : error ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>❌</div>
          <p>{error}</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📦</div>
          <p>Chưa có đơn hàng nào trong mục này.</p>
        </div>
      ) : (
        <div style={styles.orderList}>
          {filteredOrders.map(order => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <span style={styles.orderId}>Mã đơn: <strong>{order.id}</strong></span>
                <span style={styles.orderStatus}>{order.status.toUpperCase()}</span>
              </div>
              <div style={styles.orderBody}>
                {order.items.map((item, index) => (
                  <div key={index} style={styles.productRow}>
                    <img src={item.img} alt={item.name} style={styles.productImg} />
                    <div style={styles.productInfo}>
                      <h4 style={styles.productName}>{item.name}</h4>
                      <p style={styles.productQty}>x{item.qty}</p>
                    </div>
                    <div style={styles.productPrice}>
                     {(item.price || 0).toLocaleString('vi-VN')}₫
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.orderFooter}>
                <div style={styles.orderTotal}>
                  Thành tiền: <span style={styles.totalPrice}>{(order.total || 0).toLocaleString('vi-VN')}₫</span>
                </div>
                <div style={styles.actionButtons}>
                  <Link to={`/lich-su-don-hang/${order.id}`} style={styles.btnOutline}>
                    XEM CHI TIẾT
                  </Link>
                  {(order.status === 'Đã giao' || order.status === 'Đã hủy') && (
                    <button style={styles.btnSolid}>MUA LẠI</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>👤</div>
          <div style={styles.userDetails}>
            <h3 style={styles.userName}>{user?.name || 'Khách hàng'}</h3>
            <p style={styles.userEmail}>{user?.email || 'email@gmail.com'}</p>
          </div>
        </div>
        <ul style={styles.menuList}>
          <li
            style={{...styles.menuItem, ...(activeMenu === 'profile' ? styles.activeMenuItem : {})}}
            onClick={() => setActiveMenu('profile')}
          >
            Hồ sơ & Bảo mật
          </li>
          <li
            style={{...styles.menuItem, ...(activeMenu === 'orders' ? styles.activeMenuItem : {})}}
            onClick={() => setActiveMenu('orders')}
          >
            Đơn mua
          </li>
          <li
            style={{...styles.menuItem, color: '#8B0000', marginTop: '20px'}}
            onClick={handleLogout}
          >
            Đăng xuất
          </li>
        </ul>
      </div>

      {/* CONTENT PHẢI */}
      <div style={styles.mainContent}>
        {activeMenu === 'orders' ? <OrdersView /> : <ProfileView />}
      </div>
    </div>
  );
};

// --- CSS INLINE DỌC ---
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    minHeight: '70vh'
  },
  sidebar: {
    flex: '0 0 250px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    borderBottom: '1px solid #f0f0f0'
  },
  avatar: {
    fontSize: '30px',
    backgroundColor: '#f5f5f5',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userDetails: {
    flex: 1,
    overflow: 'hidden'
  },
  userName: {
    margin: '0 0 5px 0',
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold'
  },
  userEmail: {
    margin: 0,
    fontSize: '13px',
    color: '#888',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  menuList: {
    listStyle: 'none',
    padding: '10px 0',
    margin: 0
  },
  menuItem: {
    padding: '12px 20px',
    color: '#555',
    cursor: 'pointer',
    fontSize: '15px',
    transition: 'all 0.2s'
  },
  activeMenuItem: {
    color: '#8B0000',
    fontWeight: 'bold',
    backgroundColor: '#fcf9f2'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  // View Container cho Profile
  viewContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  viewTitle: {
    margin: '0 0 10px 0',
    fontSize: '20px',
    color: '#333'
  },
  viewSub: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '20px'
  },
  hr: {
    border: 'none',
    borderBottom: '1px solid #eee',
    marginBottom: '30px'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  label: {
    width: '150px',
    textAlign: 'right',
    fontSize: '14px',
    color: '#555'
  },
  textStatic: {
    fontSize: '14px',
    fontWeight: 'bold'
  },
  input: {
    flex: '1',
    maxWidth: '400px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none'
  },
  btnSave: {
    marginTop: '30px',
    marginLeft: '170px',
    backgroundColor: '#8B0000',
    color: '#fff',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  // Tabs & Orders
  tabsContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    overflowX: 'auto'
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    padding: '15px',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#555',
    borderBottom: '3px solid transparent',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  activeTab: {
    color: '#8B0000',
    fontWeight: 'bold',
    borderBottomColor: '#8B0000'
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  },
  orderHeader: {
    padding: '15px 20px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderId: {
    fontSize: '14px',
    color: '#333'
  },
  orderStatus: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#8B0000'
  },
  orderBody: {
    padding: '20px'
  },
  productRow: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px dashed #f0f0f0'
  },
  productImg: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    border: '1px solid #eee'
  },
  productInfo: {
    flex: 1
  },
  productName: {
    margin: '0 0 8px 0',
    fontSize: '15px',
    color: '#333'
  },
  productQty: {
    margin: 0,
    fontSize: '14px',
    color: '#777'
  },
  productPrice: {
    fontSize: '15px',
    color: '#333',
    fontWeight: 'bold'
  },
  orderFooter: {
    padding: '15px 20px',
    backgroundColor: '#fafbfc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  },
  orderTotal: {
    fontSize: '15px',
    color: '#555'
  },
  totalPrice: {
    fontSize: '20px',
    color: '#8B0000',
    fontWeight: 'bold',
    marginLeft: '10px'
  },
  actionButtons: {
    display: 'flex',
    gap: '10px'
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#8B0000',
    border: '1px solid #8B0000',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    transition: 'all 0.2s'
  },
  btnSolid: {
    backgroundColor: '#8B0000',
    color: '#fff',
    border: '1px solid #8B0000',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  emptyState: {
    backgroundColor: '#fff',
    padding: '60px 20px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    color: '#777'
  },
  emptyIcon: {
    fontSize: '60px',
    marginBottom: '15px',
    opacity: 0.5
  }
};

export default LichSuDonHang;