
import React from 'react';

const LienHe = () => {
  return (
    <div style={styles.container}>
      
      <div style={styles.headerSection}>
        <h1 style={styles.title}>LIÊN HỆ VỚI CHÚNG TÔI</h1>
        <div style={styles.redLine}></div>
        <p style={styles.subtitle}>
          Để lại lời nhắn hoặc đến trực tiếp xưởng rang của chúng tôi để trải nghiệm quy trình sản xuất cà phê nguyên chất 100%.
        </p>
      </div>

      <div style={styles.contactWrapper}>
        
        <div style={styles.infoCol}>
          <h2 style={styles.colTitle}>CHẤT COFFEE</h2>
          
          <div style={styles.infoItem}>
            <strong>📍 Địa chỉ:</strong>
            <p style={styles.infoText}>180 Cao Lỗ, P4, Thành phố Hồ Chí Minh</p>
          </div>
          
          <div style={styles.infoItem}>
            <strong>📞 Điện thoại:</strong>
            <p style={styles.infoText}>077744678</p>
          </div>
          
          <div style={styles.infoItem}>
            <strong>✉️ Email:</strong>
            <p style={styles.infoText}>chatcoffee@gmail.com</p>
          </div>

          <div style={styles.infoItem}>
            <strong>⏰ Giờ làm việc:</strong>
            <p style={styles.infoText}>Thứ 2 - Thứ 7: 8:00 Sáng - 17:30 Chiều<br/>Chủ nhật: Nghỉ</p>
          </div>
        </div>

        <div style={styles.formCol}>
          <h2 style={styles.colTitle}>GỬI LỜI NHẮN CHO CHÚNG TÔI</h2>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Họ và tên của bạn *" style={styles.input} required />
            <div style={styles.rowInput}>
              <input type="email" placeholder="Email *" style={{...styles.input, flex: 1}} required />
              <input type="tel" placeholder="Số điện thoại *" style={{...styles.input, flex: 1}} required />
            </div>
            <textarea placeholder="Nội dung lời nhắn..." style={styles.textarea} rows="5" required></textarea>
            <button type="submit" style={styles.submitBtn}>GỬI ĐI</button>
          </form>
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
    backgroundColor: '#fff'
  },
  
  headerSection: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  title: {
    fontSize: '32px',
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
    maxWidth: '600px',
    margin: '0 auto',
  },

  contactWrapper: {
    display: 'flex',
    flexWrap: 'wrap', 
    gap: '40px',
    marginBottom: '60px'
  },
  
  infoCol: {
    flex: '1 1 400px',
    backgroundColor: '#fcf9f2', 
    padding: '30px',
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  colTitle: {
    fontSize: '20px',
    color: '#8B0000',
    marginBottom: '20px',
    lineHeight: '1.4'
  },
  infoItem: {
    marginBottom: '15px',
    fontSize: '15px',
    color: '#333'
  },
  infoText: {
    margin: '5px 0 0 25px', 
    color: '#555',
    lineHeight: '1.5'
  },

  // Cột phải (Form)
  formCol: {
    flex: '1 1 500px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  rowInput: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    flexWrap: 'wrap' 
  },
  input: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    marginBottom: '15px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  textarea: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    marginBottom: '20px',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  submitBtn: {
    backgroundColor: '#8B0000',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'background-color 0.2s'
  },


};

export default LienHe;