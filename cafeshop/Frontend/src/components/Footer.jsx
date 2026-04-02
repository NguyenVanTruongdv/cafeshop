import React from 'react';

const Footer = () => {

  const col2Links = [
    "Hướng dẫn mua hàng", "Hình thức thanh toán", "Đổi hàng – Trả hàng", 
    "Cung cấp cafe nguyên chất"
  ];
  const col3Links = [
    "Nguyen Chat Coffee cam kết", "Vì sao chọn CaPheChat.vn", 
     "Mua Cà Phê Rang Xay", "Cà Phê Sài Gòn"
  ];

  return (
    <div style={styles.footerContainer}>
      <div style={styles.grid}>

        {/* CỘT 2: HƯỚNG DẪN MUA HÀNG */}
        <div>
          <h3 style={styles.heading}>HƯỚNG DẪN MUA HÀNG</h3>
          <div style={styles.shortLine}></div>
          <ul style={styles.list}>
            {col2Links.map((link, index) => (
              <li key={index} style={styles.listItem}>
                <a href="#" style={styles.link}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* CỘT 3: CAM KẾT */}
        <div>
          <h3 style={styles.heading}>CAM KẾT</h3>
          <div style={styles.shortLine}></div>
          <ul style={styles.list}>
            {col3Links.map((link, index) => (
              <li key={index} style={styles.listItem}>
                <a href="#" style={styles.link}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* CỘT 4: LIÊN HỆ */}
        <div>
          <h3 style={styles.heading}>LIÊN HỆ</h3>
          <div style={styles.shortLine}></div>
          
          <div style={styles.contactInfo}>
            <p style={styles.contactText}><strong>CHẤT COFFEE</strong></p>
            <p style={styles.contactText}>Người đại diện: Nguyễn Văn Chất</p>
            <p style={styles.contactText}>180 Cao Lỗ, P4, Thành phố Hồ Chí Minh</p>
            <p style={styles.contactText}>0777444678</p>
            <p style={styles.contactText}>chatcoffee@gmail.com</p>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  footerContainer: {
    backgroundColor: '#111', 
    color: '#fff',
    padding: '60px 20px',
    marginTop: 'auto', 
    borderTop: '5px solid #8B0000' 
  },
  grid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
    gap: '30px'
  },
  heading: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  shortLine: {
    width: '30px',
    height: '2px',
    backgroundColor: '#8B0000',
    marginBottom: '20px'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    marginBottom: '15px'
  },
  link: {
    color: '#ccc', 
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  contactText: {
    margin: 0,
    color: '#ccc',
    fontSize: '14px',
    lineHeight: '1.5'
  }
};

export default Footer;