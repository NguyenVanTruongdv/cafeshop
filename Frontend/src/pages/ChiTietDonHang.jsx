import React from 'react';
import { useParams, Link } from 'react-router-dom';
const allOrders = [
  {
    id: "ORD-20260330-01",
    date: "30/03/2026 14:30",
    status: "Đã giao hàng",
    payment: "Thanh toán khi nhận hàng (COD)",
    total: 459000,
    items: [
      { name: "Cà phê nguyên chất Hạt CULI", qty: 1, price: 320000, img: "https://placehold.co/80x80/8B0000/FFF?text=Culi" },
      { name: "Cacao Nguyên Chất", qty: 1, price: 139000, img: "https://placehold.co/80x80/4B2C20/FFF?text=Cacao" }
    ]
  },
  {
    id: "ORD-20260325-88",
    date: "25/03/2026 09:15",
    status: "Đang giao",
    payment: "Chuyển khoản ngân hàng",
    total: 370000,
    items: [
      { name: "Cà phê Hạt ESPRESSO BLEND 1", qty: 1, price: 370000, img: "https://placehold.co/80x80/8B0000/FFF?text=Esp1" }
    ]
  },
  {
    id: "ORD-20260320-42",
    date: "20/03/2026 18:45",
    status: "Chờ xác nhận",
    payment: "Thanh toán khi nhận hàng (COD)",
    total: 165000,
    items: [
      { name: "Cà phê Hạt Thượng Hạng 2", qty: 1, price: 165000, img: "https://placehold.co/80x80/4B2C20/FFF?text=TH2" }
    ]
  }
];

const ChiTietDonHang = () => {
  const { id } = useParams(); 

  const currentOrder = allOrders.find(order => order.id === id);

  if (!currentOrder) {
    return (
      <div style={styles.container}>
        <h2>Không tìm thấy đơn hàng này!</h2>
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
          MÃ ĐƠN HÀNG: {currentOrder.id} | <span style={{color: '#8B0000', fontWeight: 'bold'}}>{currentOrder.status.toUpperCase()}</span>
        </span>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.infoCol}>
          <div style={styles.infoBox}>
            <h3 style={styles.boxTitle}>Địa Chỉ Nhận Hàng</h3>
            <p style={styles.textBold}>Khách Hàng VIP</p>
            <p style={styles.textSub}>0901 234 567</p>
            <p style={styles.textSub}>180 Cao Lỗ, Phường 4, Quận 8, TP. Hồ Chí Minh</p>
          </div>

          <div style={styles.infoBox}>
            <h3 style={styles.boxTitle}>Hình Thức Thanh Toán</h3>
            <p style={styles.textSub}>{currentOrder.payment}</p>
          </div>
        </div>

        <div style={styles.productCol}>
          <div style={styles.productTable}>
            {currentOrder.items.map((item, idx) => (
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
              <span>{currentOrder.total.toLocaleString('vi-VN')}₫</span>
            </div>
            <div style={styles.sumLine}>
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
            <div style={{ ...styles.sumLine, marginTop: '10px' }}>
              <span style={styles.totalLabel}>Tổng cộng:</span>
              <span style={styles.totalVal}>{currentOrder.total.toLocaleString('vi-VN')}₫</span>
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