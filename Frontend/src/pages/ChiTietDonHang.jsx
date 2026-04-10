import React, { useParams, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5224/api';

const ChiTietDonHang = () => {
  const { id } = useParams();
  const { token, isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !id) {
      setError('Vui lòng đăng nhập để xem chi tiết đơn hàng.');
      setLoading(false);
      return;
    }

    const fetchOrderDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_URL}/Order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data?.message || 'Không tìm thấy đơn hàng.');
        }
        const data = await res.json();
        const orderData = data?.data;
        if (!orderData) {
          throw new Error('Không tìm thấy dữ liệu đơn hàng.');
        }
        setOrder({
          id: orderData.id,
          date: orderData.createdDate ? new Date(orderData.createdDate).toLocaleString('vi-VN') : 'N/A',
          status: orderData.status || 'Chờ xác nhận',
          payment: orderData.paymentMethod || 'Chưa xác định',
          total: orderData.totalAmount || 0,
          items: (orderData.items ?? []).map((item) => ({
            name: item.productName || 'Sản phẩm',
            qty: item.quantity || 1,
            price: item.price || 0,
            img: 'https://placehold.co/80x80/8B0000/FFF?text=Sản+phẩm',
          })),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id, token, isAuthenticated]);

  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Đang tải chi tiết đơn hàng...</h2>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={styles.container}>
        <h2>Lỗi: {error}</h2>
        <Link to="/lich-su-don-hang">Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.backHeader}>
        <Link to="/lich-su-don-hang" style={styles.backBtn}>
          ← QUAY LẠI
        </Link>
        <span style={styles.orderIdHeader}>
          MÃ ĐƠN HÀNG: {order.id} | <span style={{color: '#8B0000', fontWeight: 'bold'}}>{order.status.toUpperCase()}</span>
        </span>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.infoCol}>
          <div style={styles.infoBox}>
            <h3 style={styles.boxTitle}>Địa Chỉ Nhận Hàng</h3>
            <p style={styles.textBold}>Khách Hàng</p>
            <p style={styles.textSub}>Số điện thoại: N/A</p>
            <p style={styles.textSub}>Địa chỉ: N/A</p>
          </div>

          <div style={styles.infoBox}>
            <h3 style={styles.boxTitle}>Hình Thức Thanh Toán</h3>
            <p style={styles.textSub}>{order.payment}</p>
          </div>
        </div>

        <div style={styles.productCol}>
          <div style={styles.productTable}>
            {order.items.map((item, idx) => (
              <div key={idx} style={styles.productRow}>
                <img src={item.img} alt={item.name} style={styles.pImg} />
                <div style={styles.pInfo}>
                  <p style={styles.pName}>{item.name}</p>
                  <p style={styles.pQty}>x{item.qty}</p>
                </div>
                <div style={styles.pPrice}>
                  {item.price.toLocaleString('vi-VN')}₫
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summaryBox}>
            <div style={styles.sumLine}>
              <span>Tổng tiền hàng:</span>
              <span>{order.total.toLocaleString('vi-VN')}₫</span>
            </div>
            <div style={styles.sumLine}>
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
            <div style={{ ...styles.sumLine, marginTop: '10px' }}>
              <span style={styles.totalLabel}>Tổng cộng:</span>
              <span style={styles.totalVal}>{order.total.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '0 20px',
    minHeight: '80vh'
  },

  // Header & Điều hướng
  backHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px'
  },
  backBtn: {
    textDecoration: 'none',
    color: '#8B0000',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  orderIdHeader: {
    fontSize: '14px',
    color: '#666'
  },
  statusHighlight: {
    color: '#8B0000',
    fontWeight: 'bold',
    marginLeft: '5px'
  },

  // Grid Layout
  contentGrid: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap'
  },

  // Cột thông tin (Sidebar)
  infoCol: {
    flex: '1 1 350px'
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '20px'
  },
  boxTitle: {
    fontSize: '16px',
    color: '#333',
    borderBottom: '2px solid #8B0000',
    paddingBottom: '8px',
    marginBottom: '15px',
    textTransform: 'uppercase'
  },
  textBold: {
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  textSub: {
    color: '#666',
    fontSize: '14px',
    margin: '3px 0'
  },

  // Cột sản phẩm (Main)
  productCol: {
    flex: '2 1 500px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  },
  productTable: {
    padding: '20px'
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    paddingBottom: '15px',
    marginBottom: '15px',
    borderBottom: '1px dashed #eee'
  },
  pImg: {
    width: '60px',
    height: '60px',
    borderRadius: '4px',
    objectFit: 'cover'
  },
  pInfo: {
    flex: 1
  },
  pName: {
    fontSize: '15px',
    margin: 0
  },
  pQty: {
    fontSize: '13px',
    color: '#888'
  },
  pPrice: {
    fontWeight: 'bold',
    color: '#333'
  },

  // Phần tính tiền
  summaryBox: {
    backgroundColor: '#fdf9f2',
    padding: '20px',
    textAlign: 'right'
  },
  sumLine: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '30px',
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '30px',
    marginTop: '10px',
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold'
  },
  totalVal: {
    fontSize: '22px',
    color: '#8B0000',
    fontWeight: 'bold'
  }
};

export default ChiTietDonHang;