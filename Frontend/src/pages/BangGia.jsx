
import React from 'react';

const priceList = [
  { id: 1, name: "Cà phê Robusta Rang Mộc", type: "Hạt / Bột", retail: "120,000đ", wholesale: "85,000đ" },
  { id: 2, name: "Cà phê Arabica Cầu Đất", type: "Hạt / Bột", retail: "180,000đ", wholesale: "135,000đ" },
  { id: 3, name: "Cà phê Culi Nguyên Chất", type: "Hạt", retail: "150,000đ", wholesale: "110,000đ" },
  { id: 4, name: "Espresso Blend (Gu Đậm)", type: "Hạt", retail: "165,000đ", wholesale: "120,000đ" },
  { id: 5, name: "Espresso Blend (Gu Mộc)", type: "Hạt", retail: "175,000đ", wholesale: "130,000đ" },
  { id: 6, name: "Cà phê Moka Thượng Hạng", type: "Hạt / Bột", retail: "250,000đ", wholesale: "190,000đ" },
];

const BangGia = () => {
  return (
    <div style={styles.container}>
      
      
      <div style={styles.headerSection}>
        <h1 style={styles.title}>BẢNG GIÁ SỈ & LẺ CÀ PHÊ NGUYÊN CHẤT</h1>
        <div style={styles.redLine}></div>
        <p style={styles.subtitle}>
          Kính gửi quý khách hàng, CHẤT COFFEE xin gửi đến quý khách bảng báo giá các dòng sản phẩm cà phê hạt rang mộc và cà phê bột nguyên chất mới nhất.
        </p>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{...styles.th, width: '10%', textAlign: 'center'}}>STT</th>
              <th style={{...styles.th, width: '40%'}}>TÊN SẢN PHẨM</th>
              <th style={{...styles.th, width: '15%', textAlign: 'center'}}>PHÂN LOẠI</th>
              <th style={{...styles.th, width: '17%', textAlign: 'right'}}>GIÁ BÁN LẺ (1Kg)</th>
              <th style={{...styles.th, width: '18%', textAlign: 'right'}}>GIÁ BÁN SỈ (Từ 10Kg)</th>
            </tr>
          </thead>
          <tbody>
            {priceList.map((item, index) => (
              <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#fcf9f2' }}>
                <td style={{...styles.td, textAlign: 'center'}}>{index + 1}</td>
                <td style={{...styles.td, fontWeight: 'bold', color: '#4B2C20'}}>{item.name}</td>
                <td style={{...styles.td, textAlign: 'center'}}>{item.type}</td>
                <td style={{...styles.td, textAlign: 'right', color: '#8B0000', fontWeight: 'bold'}}>{item.retail}</td>
                <td style={{...styles.td, textAlign: 'right', color: '#A01515', fontWeight: 'bold'}}>{item.wholesale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.noteSection}>
        <h3 style={styles.noteTitle}>📌 Chính sách & Ghi chú:</h3>
        <ul style={styles.noteList}>
          <li style={styles.noteItem}>Bảng giá trên <strong>chưa bao gồm 8% VAT</strong>.</li>
          <li style={styles.noteItem}><strong>Miễn phí giao hàng</strong> nội thành TP.HCM cho đơn hàng từ 5kg trở lên.</li>
          <li style={styles.noteItem}>Khách hàng mua sỉ số lượng lớn (từ 50kg, 100kg) vui lòng liên hệ trực tiếp Hotline để có chính sách chiết khấu tốt nhất.</li>
          <li style={styles.noteItem}>Nhận rang gia công theo gu riêng của quán (cung cấp mẫu test miễn phí).</li>
        </ul>
      </div>

    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#fff',
    minHeight: '60vh'
  },
  
  // Header
  headerSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '28px',
    color: '#8B0000',
    fontWeight: 'bold',
    margin: '0 0 15px 0'
  },
  redLine: {
    width: '80px',
    height: '4px',
    backgroundColor: '#8B0000',
    margin: '0 auto 20px auto'
  },
  subtitle: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6'
  },

  // Table
  tableWrapper: {
    overflowX: 'auto', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '700px' 
  },
  th: {
    backgroundColor: '#8B0000',
    color: '#fff',
    padding: '15px',
    fontSize: '15px',
    textTransform: 'uppercase',
    borderBottom: '2px solid #6b0000',
    textAlign: 'left' 
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    fontSize: '15px',
    color: '#333'
  },

  // Notes
  noteSection: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#fcfcfc',
    borderLeft: '4px solid #8B0000',
    borderRadius: '4px'
  },
  noteTitle: {
    margin: '0 0 15px 0',
    color: '#333',
    fontSize: '18px'
  },
  noteList: {
    margin: 0,
    paddingLeft: '20px',
    color: '#555',
    lineHeight: '1.8'
  },
  noteItem: {
    marginBottom: '8px'
  }
};

export default BangGia;