import React, { useState, useContext } from 'react'; 
import { useParams } from 'react-router-dom'; 
import { coffeeProducts } from '../services/mockData'; 
import { CartContext } from '../context/CartContext'; 

const ChiTietSanPham = () => {
  const { id } = useParams();
  const product = coffeeProducts.find((p) => p.id === parseInt(id));

  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const [selectedWeight, setSelectedWeight] = useState('500g');
  const weights = ['250g', '500g', '1kg'];

  const [toast, setToast] = useState({ show: false, message: '' });

  if (!product) {
    return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Sản phẩm không tồn tại!</h2>;
  }

  const displayPrice = 
    selectedWeight === '250g' ? product.price * 0.55 : 
    selectedWeight === '1kg' ? product.price * 1.9 : 
    product.price; 

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ ...product, quantity, weight: selectedWeight });
    }

    setToast({
      show: true,
      message: `Đã thêm vào giỏ hàng!`
    });

    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.topSection}>
        <div style={styles.imageCol}>
          <img 
            src={product.image}  
            alt={product.name} 
            style={styles.mainImage}
            onError={(e) => { e.target.src = 'https://placehold.co/500x500/8B0000/FFF?text=Hinh+Anh+Loi'; }}
          />
          <div style={styles.thumbnailList}>
            <img src={product.image} alt="thumb1" style={styles.thumbnail} />
            <img src="https://placehold.co/100x100/4B2C20/FFF?text=Hinh+2" alt="thumb2" style={styles.thumbnail} />
          </div>
        </div>

        <div style={styles.infoCol}>
          <h1 style={styles.productName}>{product.name}</h1> 
          
          <div style={styles.redLine}></div>

          <p style={styles.productPrice}>{displayPrice.toLocaleString('vi-VN')}₫</p>
          
          <p style={styles.shortDesc}>
            Dòng sản phẩm chất lượng cao của Chất Coffee. Phân loại: <strong>{product.type}</strong>. 
            Cam kết 100% nguyên chất, không tẩm ướp, mang lại hương vị đậm đà nguyên bản.
          </p>

          <div style={styles.metaInfo}>
            <p><strong>Tình trạng:</strong> <span style={{color: 'green'}}>Còn hàng</span></p>
          </div>

          <div style={styles.weightSection}>
            <span style={styles.weightLabel}>Chọn trọng lượng:</span>
            <div style={styles.weightOptions}>
              {weights.map((weight) => (
                <button
                  key={weight}
                  style={{
                    ...styles.weightBtn,
                    ...(selectedWeight === weight ? styles.activeWeightBtn : {})
                  }}
                  onClick={() => setSelectedWeight(weight)}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.quantitySection}>
            <span style={styles.quantityLabel}>Số lượng:</span>
            <div style={styles.quantityBox}>
              <button onClick={handleDecrease} style={styles.qtyBtn}>-</button>
              <input type="text" value={quantity} readOnly style={styles.qtyInput} />
              <button onClick={handleIncrease} style={styles.qtyBtn}>+</button>
            </div>
          </div>

          <div style={styles.actionButtons}>
            <button 
              style={styles.addToCartBtn}
              onClick={handleAddToCart} 
            >
              🛒 THÊM VÀO GIỎ HÀNG
            </button>
            <button style={styles.buyNowBtn}>MUA NGAY</button>
          </div>
        </div>
      </div>

      <div style={styles.bottomSection}>
        <h2 style={styles.descTitle}>MÔ TẢ SẢN PHẨM</h2>
        <div style={styles.descContent}>
          <p><strong>Cà phê nguyên chất Hạt CULI (đặc biệt)</strong> là sự lựa chọn tối ưu cho các tín đồ yêu thích gu cà phê pha máy đậm đà chuẩn vị Ý nhưng vẫn mang đậm bản sắc cà phê Việt.</p>
          
          <h3>Thành phần & Kỹ thuật rang</h3>
          <ul>
            <li><strong>Thành phần:</strong> 70% Robusta Đăk Mil (Size 18) - 30% Arabica Cầu Đất.</li>
            <li><strong>Mức độ rang (Roast level):</strong> Medium Dark (Rang đậm vừa) bằng công nghệ Hot Air hiện đại, đảm bảo hạt chín đều từ trong ra ngoài, không bị khét.</li>
            <li><strong>Đặc tính:</strong> Không bơ, không mắm muối, không hương liệu nhân tạo. 100% mộc.</li>
          </ul>

          <h3>Hướng dẫn sử dụng (Dành cho máy Espresso)</h3>
          <p>Để chiết xuất được ly Espresso hoàn hảo nhất, vui lòng lưu ý:</p>
          <ul>
            <li>Chỉ xay cà phê ngay trước khi pha để giữ trọn vẹn hương thơm.</li>
            <li>Mức xay (Grind size): Mịn vừa (Fine). Nếu nước chảy quá nhanh, hãy chỉnh cối xay mịn hơn; nếu chảy chậm hoặc nhỏ giọt, hãy chỉnh thô hơn một chút.</li>
            <li>Lượng cà phê (Dose): Khoảng 18g - 20g cho một shot đôi (Double shot).</li>
          </ul>
        </div>
      </div>

      {toast.show && (
        <div style={styles.toastContainer}>
          <div style={styles.toastIcon}>✔</div>
          <div style={styles.toastContent}>
            <div style={styles.toastTitle}>Thành công</div>
            <div style={styles.toastMessage}>{toast.message}</div>
          </div>
        </div>
      )}

    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#fff',
    position: 'relative' 
  },
  
  topSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '50px',
    marginBottom: '60px'
  },
  
  imageCol: { flex: '1 1 450px' },
  mainImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #eee',
    marginBottom: '15px'
  },
  thumbnailList: { display: 'flex', gap: '10px' },
  thumbnail: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #ddd',
    cursor: 'pointer'
  },

  infoCol: {
    flex: '1 1 500px',
    display: 'flex',
    flexDirection: 'column',
  },
  productName: {
    fontSize: '26px',
    color: '#333',
    margin: '0 0 15px 0',
    lineHeight: '1.4'
  },
  redLine: {
    width: '60px',
    height: '3px',
    backgroundColor: '#8B0000',
    marginBottom: '20px'
  },
  productPrice: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#8B0000',
    margin: '0 0 20px 0'
  },
  shortDesc: {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  metaInfo: {
    fontSize: '15px',
    color: '#333',
    marginBottom: '20px',
    lineHeight: '1.8'
  },

  weightSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '25px'
  },
  weightLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '20px',
    minWidth: '130px'
  },
  weightOptions: {
    display: 'flex',
    gap: '12px',
  },
  weightBtn: {
    padding: '8px 20px',
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
  },
  activeWeightBtn: {
    backgroundColor: '#8B0000',
    color: '#fff',
    borderColor: '#8B0000',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(139,0,0,0.2)'
  },
  
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px'
  },
  quantityLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '20px',
    minWidth: '130px'
  },
  quantityBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  qtyBtn: {
    width: '40px',
    height: '40px',
    backgroundColor: '#f5f5f5',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  qtyInput: {
    width: '50px',
    height: '40px',
    textAlign: 'center',
    border: 'none',
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    fontSize: '16px',
    fontWeight: 'bold',
    outline: 'none'
  },

  actionButtons: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },
  addToCartBtn: {
    flex: 1,
    padding: '15px 20px',
    backgroundColor: '#fff',
    color: '#8B0000',
    border: '2px solid #8B0000',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  buyNowBtn: {
    flex: 1,
    padding: '15px 20px',
    backgroundColor: '#8B0000',
    color: '#fff',
    border: '2px solid #8B0000',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },

  bottomSection: {
    borderTop: '1px solid #eee',
    paddingTop: '40px'
  },
  descTitle: {
    fontSize: '22px',
    color: '#8B0000',
    marginBottom: '20px',
    textTransform: 'uppercase'
  },
  descContent: {
    fontSize: '16px',
    color: '#444',
    lineHeight: '1.8'
  },

  toastContainer: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#fff',
    borderLeft: '5px solid #8B0000',
    boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
    padding: '15px 25px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    zIndex: 9999,
    animation: 'slideInRight 0.4s ease-out'
  },
  toastIcon: {
    width: '30px',
    height: '30px',
    backgroundColor: '#8B0000',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px'
  },
  toastContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  toastTitle: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '15px'
  },
  toastMessage: {
    color: '#666',
    fontSize: '13px',
    marginTop: '2px'
  }
};

export default ChiTietSanPham;