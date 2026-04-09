
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert("FE2: Viết logic Đăng nhập (gọi API login) ở đây!");
    } else {
      alert("FE2: Viết logic Đăng ký (gọi API register) ở đây!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authBox}>
        
        <div style={styles.header}>
          <h2 style={styles.title}>
            {isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ TÀI KHOẢN'}
          </h2>
          <p style={styles.subtitle}>
            {isLogin 
              ? 'Chào mừng bạn quay lại với Chất Coffee!' 
              : 'Trở thành thành viên để nhận nhiều ưu đãi hấp dẫn.'}
          </p>
          
          <div style={styles.toggleWrapper}>
            <button 
              style={{...styles.toggleBtn, ...(isLogin ? styles.activeToggle : {})}}
              onClick={() => setIsLogin(true)}
            >
              Đăng Nhập
            </button>
            <button 
              style={{...styles.toggleBtn, ...(!isLogin ? styles.activeToggle : {})}}
              onClick={() => setIsLogin(false)}
            >
              Đăng Ký
            </button>
          </div>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Họ và tên *</label>
              <input type="text" placeholder="Nhập họ tên của bạn" style={styles.input} required />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email *</label>
            <input type="email" placeholder="Nhập địa chỉ email" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mật khẩu *</label>
            <input type="password" placeholder="Nhập mật khẩu" style={styles.input} required />
          </div>

          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nhập lại mật khẩu *</label>
              <input type="password" placeholder="Xác nhận mật khẩu" style={styles.input} required />
            </div>
          )}

          <button type="submit" style={styles.submitBtn}>
            {isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
          </button>

          {isLogin && (
            <div style={styles.forgotPassword}>
              <Link to="#" style={styles.linkText}>Quên mật khẩu?</Link>
            </div>
          )}

        </form>

      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh',
    backgroundColor: '#FDFCF0',
    padding: '40px 20px'
  },
  authBox: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '450px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    overflow: 'hidden', // Để bo góc đẹp hơn
    border: '1px solid #eaeaea'
  },
  
  // Header
  header: {
    backgroundColor: '#fcf9f2',
    padding: '30px',
    textAlign: 'center',
    borderBottom: '1px solid #eee'
  },
  title: {
    color: '#8B0000',
    fontSize: '24px',
    margin: '0 0 10px 0',
    textTransform: 'uppercase'
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
    margin: '0 0 20px 0'
  },
  
  toggleWrapper: {
    display: 'flex',
    backgroundColor: '#eee',
    borderRadius: '30px',
    padding: '5px',
    position: 'relative'
  },
  toggleBtn: {
    flex: 1,
    padding: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666',
    cursor: 'pointer',
    borderRadius: '25px',
    transition: 'all 0.3s ease'
  },
  activeToggle: {
    backgroundColor: '#8B0000',
    color: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  },

  form: {
    padding: '30px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s'
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#8B0000',
    color: '#fff',
    padding: '14px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s'
  },
  
  forgotPassword: {
    textAlign: 'center',
    marginTop: '20px'
  },
  linkText: {
    color: '#A7665D',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s'
  }
};

export default Auth;