import React from 'react';
import { Link } from 'react-router-dom';
const miniProducts = [
  { id: 1, category: "CAFE", name: "Cà phê nguyên chất Hạt CULI (đặc biệt)", price: "320.000đ", img: "/images/Cà phê nguyên chất Hạt CULI (đặc biệt).jpg" },
  { id: 2, category: "CAFE", name: "Cà phê nguyên chất Hạt ESPRESSO BLEND 1", price: "370.000đ", img: "/images/ESPRESSO BLEND 2 .jpg" },
  { id: 3, category: "CAFE", name: "Cà phê nguyên chất Hạt ESPRESSO BLEND 2", price: "400.000đ", img: "/images/Cà phê nguyên chất Hạt ESPRESSO BLEND 2.jpg" },
  { id: 4, category: "CAFE", name: "Cà phê nguyên chất Hạt Thượng Hạng 2 ", price: "43.000đ", img: "/images/Hạt Thượng Hạng 2.jpg", outOfStock: true } // Thêm cờ hết hàng cho thẻ thứ 4
];

const HomePageIntro = () => {
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
          {miniProducts.map((p) => (
            <div key={p.id} style={styles.miniCard}>
              
              <div style={styles.miniImgWrapper}>
                <img src={p.img} alt={p.name} style={styles.miniImg} />
                {p.outOfStock && (
                  <div style={styles.outOfStockOverlay}>HẾT HÀNG</div>
                )}
              </div>

              <div style={styles.redRibbon}></div>

              <p style={styles.miniCat}>{p.category}</p>
             <Link to={`/san-pham/${p.id}`} style={{ textDecoration: 'none' }}>
                <h4 style={styles.miniName}>{p.name}</h4>
              </Link>
              <p style={styles.miniPrice}>{p.price}</p>
            </div>
          ))}
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
  
  miniImgWrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: '10px',
    overflow: 'hidden'
  },
  miniImg: {
    width: '100%',
    height: '250px', 
    objectFit: 'cover'
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '14px'
  },

  redRibbon: {
    height: '4px',
    backgroundColor: '#8B0000',
    width: '100%',
    marginBottom: '10px'
  },
  miniCat: {
    fontSize: '11px',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: '4px'
  },
  miniName: {
    fontSize: '14px',
    color: '#333',
    fontWeight: 'normal',
    marginBottom: '6px',
    minHeight: '40px'
  },
  miniPrice: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#000'
  }
};

export default HomePageIntro;