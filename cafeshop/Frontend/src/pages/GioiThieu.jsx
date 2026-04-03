import React from 'react';

const GioiThieu = () => {
  return (
    <div style={styles.container}>
      
      <div style={styles.headerSection}>
        <h1 style={styles.title}>VỀ CHÚNG TÔI</h1>
        <div style={styles.redLine}></div>
        <p style={styles.subtitle}>
          Hành trình mang hạt cà phê nguyên chất 100% từ nông trại đến tách cà phê pha máy, pha phin của bạn.
        </p>
      </div>
      <div style={styles.contentWrapper}>
        
        <div style={styles.textContent}>
          <h2 style={styles.heading}>Cà phê sạch - Cuộc sống sạch - Vì sức khỏe cộng đồng</h2>
          <p style={styles.paragraph}>
            Ra đời với niềm đam mê mãnh liệt dành cho hạt cà phê Việt, chúng tôi tự hào là đơn vị chuyên sản xuất và phân phối trực tiếp các dòng <strong>cà phê hạt và cà phê bột rang mộc nguyên chất</strong>. 
          </p>
          
          <p style={styles.paragraph}>
            Khác biệt với các mô hình kinh doanh quán nước, chúng tôi tập trung 100% tâm huyết vào việc cung cấp nguyên liệu. Mục tiêu của chúng tôi là mang đến cho những khách hàng sành điệu, người tiêu dùng tại nhà, cũng như các đối tác đại lý những mẻ cà phê được rang xay hoàn hảo nhất để tự tay pha chế.
          </p>

          <p style={styles.paragraph}>
            Từ những hạt Robusta đậm đà của vùng đất Đăk Mil đến những hạt Arabica chua thanh thượng hạng từ Cầu Đất, quy trình sản xuất khép kín <em>"Từ trang trại đến xưởng rang"</em> đảm bảo tuyệt đối không pha tẩm bất kỳ hóa chất, hương liệu hay phụ gia nào.
          </p>

          <h3 style={styles.subHeading}>Tiêu chuẩn & Cam kết của chúng tôi:</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.checkIcon}>✔</span> 
              <strong>100% Sạch & Nguyên chất:</strong> Không độn bắp, đậu nành, không chất tạo màu, tạo bọt.
            </li>
            <li style={styles.listItem}>
              <span style={styles.checkIcon}>✔</span> 
              <strong>Bí quyết rang xay độc nhất:</strong> Kỹ thuật rang Hot Air hồi khí chuẩn SCA, đảm bảo trăm mẻ như một, đa dạng mức độ rang cho cả pha phin truyền thống và máy Espresso.
            </li>
            <li style={styles.listItem}>
              <span style={styles.checkIcon}>✔</span> 
              <strong>Bảo vệ sức khỏe:</strong> Trải nghiệm ly cà phê Sạch Nhất, Ngon Nhất, bảo vệ sức khỏe người tiêu dùng Việt.
            </li>
          </ul>
        </div>

        <div style={styles.imageContent}>
          <img 
            src="images/gioithieu.jpg" 
            alt="Xưởng rang cà phê nguyên chất" 
            style={styles.image} 
          />
        </div>

      </div>
    </div>
  );
};
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#FDFCF0' 
  },
  
  // Header
  headerSection: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  title: {
    fontSize: '32px',
    color: '#8B0000',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    textTransform: 'uppercase'
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
    maxWidth: '600px',
    margin: '0 auto',
    fontStyle: 'italic'
  },

  contentWrapper: {
    display: 'flex',
    flexWrap: 'wrap', 
    gap: '50px',
    alignItems: 'flex-start'
  },
  
  // Cột chữ
  textContent: {
    flex: '1 1 500px', },
  heading: {
    fontSize: '22px',
    color: '#A01515',
    marginBottom: '20px',
    lineHeight: '1.4'
  },
  subHeading: {
    fontSize: '18px',
    color: '#333',
    marginTop: '30px',
    marginBottom: '15px'
  },
  paragraph: {
    fontSize: '15px',
    color: '#444',
    lineHeight: '1.7',
    marginBottom: '15px',
    textAlign: 'justify'
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    fontSize: '15px',
    color: '#333',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    lineHeight: '1.5'
  },
  checkIcon: {
    color: '#8B0000',
    fontWeight: 'bold',
    marginRight: '10px',
    fontSize: '16px'
  },

  imageContent: {
    flex: '1 1 400px', 
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)' 
  }
};

export default GioiThieu;