import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { API_PRODUCTS_URL } from '../apiConfig';

const HomePageIntro = () => {
  const [miniProducts, setMiniProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_PRODUCTS_URL);
        if (!res.ok) {
          throw new Error('Không thể lấy dữ liệu sản phẩm');
        }
        const data = await res.json();
        const items = Array.isArray(data) ? data.slice(0, 4) : [];
        setMiniProducts(items);
      } catch (err) {
        console.error(err);
        setError('Tải sản phẩm nổi bật thất bại. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.introSection}>
      
      <div style={styles.leftCol}>
        <img 
          src="/images/trangchu1.jpg" 
          alt="Gia đình cà phê sạch" 
          style={styles.posterImg} 
        />
      </div>

      <div style={styles.rightCol}>
        <h2 style={styles.heading}>
          CÀ PHÊ NGUYÊN CHẤT LÀ GÌ? <br />
          Bạn CHƯA BIẾT UỐNG CAFE Ngon và KHÔNG BẢO VỆ MÌNH CHO ĐẾN KHI thưởng thức cà phê nguyên chất của thương hiệu CHẤT COFFEE
        </h2>
        
        <p style={styles.paragraph}>
          Cà Phê Nguyên Chất – Đặc sản Cà Phê Sạch gắn liền Văn Hóa Tây Nguyên không thể sao chép cùng quy trình khép kín từ trang trại đến ly cafe với 100% hạt cà phê không tẩm ướp thượng hạng Cầu Đất và Đăk Mil.
        </p>
        <p style={styles.paragraph}>
          Thông qua bí quyết rang xay, chế biến cà phê sạch độc nhất vô nhị và khâu kiểm tra chất lượng gắt gao để cho ra những ly cà phê SẠCH NHẤT, NGON NHẤT, ĐẶC BIỆT CHO SỨC KHỎE.
        </p>

        <div style={styles.productGrid}>
          {loading ? (
            <div style={styles.loadingMessage}>Đang tải sản phẩm nổi bật...</div>
          ) : error ? (
            <div style={styles.errorMessage}>{error}</div>
          ) : miniProducts.length === 0 ? (
            <div style={styles.emptyMessage}>Chưa có sản phẩm nổi bật để hiển thị.</div>
          ) : (
            miniProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          )}
        </div>
        
      </div>
    </div>
  );
};

const styles = {
  introSection: {
    maxWidth: '1200px', 
    margin: '60px auto', 
    padding: '0 20px',
    display: 'flex',
    gap: '30px', 
    flexWrap: 'wrap' 
  },
  
  // Cột trái
  leftCol: {
    flex: '1 1 350px', 
  },
  posterImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
  },

  rightCol: {
    flex: '2 1 600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  heading: {
    color: '#8B0000', 
    fontSize: '22px',
    lineHeight: '1.4',
    marginBottom: '20px',
    textTransform: 'uppercase'
  },
  paragraph: {
    color: '#555',
    lineHeight: '1.6',
    fontSize: '15px',
    marginBottom: '15px'
  },

  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gap: '15px',
    marginTop: '30px'
  },
  miniCard: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },

  redRibbon: {
    height: '4px',
    backgroundColor: '#8B0000',
    width: '100%',
    marginBottom: '10px'
  },
  loadingMessage: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#8B0000',
    padding: '30px 0'
  },
  errorMessage: {
    gridColumn: '1 / -1', //
    textAlign: 'center',
    color: '#D32F2F',
    padding: '30px 0'
  },
  emptyMessage: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#555',
    padding: '30px 0'
  },
  loadingMessage: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#8B0000',
    padding: '30px 0'
  },
  errorMessage: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#D32F2F',
    padding: '30px 0'
  },
  emptyMessage: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#555',
    padding: '30px 0'
  }
};

export default HomePageIntro;