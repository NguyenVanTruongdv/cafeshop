
import React, { useState, useEffect } from 'react';
import { laybienthesanpham } from '../services/api';

const BangGia = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await laybienthesanpham();
        setVariants(data || []);
      } catch (err) {
        console.error(err);
        setError('Không thể tải bảng giá từ server.');
      } finally {
        setLoading(false);
      }
    };
    fetchVariants();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải bảng giá...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h1 style={styles.title}>BẢNG GIÁ SẢN PHẨM</h1>
        <div style={styles.redLine}></div>
        <p style={styles.subtitle}>
          Bảng giá các biến thể sản phẩm cà phê từ hệ thống.
        </p>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{...styles.th, width: '10%', textAlign: 'center'}}>STT</th>
              <th style={{...styles.th, width: '40%'}}>TÊN SẢN PHẨM</th>
              <th style={{...styles.th, width: '20%', textAlign: 'center'}}>TRỌNG LƯỢNG</th>
              <th style={{...styles.th, width: '15%', textAlign: 'right'}}>GIÁ</th>
              <th style={{...styles.th, width: '15%', textAlign: 'center'}}>TỒN KHO</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, index) => (
              <tr key={variant.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#fcf9f2' }}>
                <td style={{...styles.td, textAlign: 'center'}}>{index + 1}</td>
                <td style={{...styles.td, fontWeight: 'bold', color: '#4B2C20'}}>{variant.productName || 'N/A'}</td>
                <td style={{...styles.td, textAlign: 'center'}}>{variant.weight || 'N/A'}</td>
                <td style={{...styles.td, textAlign: 'right', color: '#8B0000', fontWeight: 'bold'}}>
                  {variant.price ? `${variant.price.toLocaleString('vi-VN')} đ` : 'Liên hệ'}
                </td>
                <td style={{...styles.td, textAlign: 'center'}}>{variant.stock ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.noteSection}>
        <h3 style={styles.noteTitle}>📌 Chính sách & Ghi chú:</h3>
        <ul style={styles.noteList}>
          <li style={styles.noteItem}>Giá có thể thay đổi theo thời gian. Vui lòng kiểm tra lại trước khi mua.</li>
          <li style={styles.noteItem}>Liên hệ hotline để biết thêm chi tiết về sản phẩm.</li>
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