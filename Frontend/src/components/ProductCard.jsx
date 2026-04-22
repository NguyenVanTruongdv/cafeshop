import React, { useContext, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { resolveImageUrl } from '../utils/imageUrl';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const imageUrl =
    resolveImageUrl(product.urlImgMain || product.image || product.imageUrl || product.ImageUrl) ||
    'https://placehold.co/300x300/8B0000/FFF?text=Hinh+Anh+Loi';
  const price = product.price ?? product.Variants?.[0]?.price ?? 0;
  const type = product.type || product.categoryName || 'Sản phẩm';
  const variantId = product.variantId ?? product.Variants?.[0]?.id ?? product.id;
  
  const cardProduct = { ...product, price, image: imageUrl, type, variantId };

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(cardProduct);
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <>
      <div 
        style={{
          ...styles.card, 
          ...(isHovered ? styles.cardHover : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/san-pham/${product.id}`} style={styles.imageContainer}>
          <img 
            src={imageUrl} 
            alt={product.name} 
            style={styles.image}
            onError={(e) => { e.target.src = 'https://placehold.co/300x300/8B0000/FFF?text=Hinh+Anh+Loi'; }}
          />
          {isHovered && <div style={styles.imageOverlay}></div>}
        </Link>

        <div style={styles.info}>
          <p style={styles.type}>{type}</p>
          
          <Link to={`/san-pham/${product.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={styles.name} title={product.name}>{product.name}</h3>
          </Link>
          
          <div style={styles.footer}>
            <p style={styles.price}>
              {price > 0 ? `${price.toLocaleString('vi-VN')} đ` : 'Liên hệ'}
            </p>
            
            <button 
              onClick={handleAddToCart} 
              style={{
                ...styles.button,
                ...(isHovered ? styles.buttonHover : {})
              }}
              title="Thêm vào giỏ hàng"
            >
              🛒 <span style={styles.buttonText}>Thêm</span>
            </button>
          </div>
        </div>
      </div> 
      {showToast && (
        <div style={styles.toastContainer}>
          <div style={styles.toastIcon}>✔</div>
          <div style={styles.toastContent}>
            <div style={styles.toastTitle}>Thành công</div>
            <div style={styles.toastMessage}>
              Đã thêm <strong>{product.name}</strong> vào giỏ!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  card: { 
    border: '1px solid #F0F0F0', 
    borderRadius: '16px', 
    overflow: 'hidden', 
    backgroundColor: '#fff', 
    textAlign: 'left', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)', 
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%', 
  },
  cardHover: {
    boxShadow: '0 12px 24px rgba(139, 0, 0, 0.12)', 
    transform: 'translateY(-5px)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%', 
    height: '220px', 
    display: 'block',
    backgroundColor: '#F9F9F9',
  },
  image: { 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover', 
    display: 'block' 
  },
  imageOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.03)', 
    pointerEvents: 'none',
  },
  info: { 
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1, 
  },
  type: { 
    fontSize: '12px', 
    color: '#888', 
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600'
  },
  name: { 
    fontSize: '16px', 
    color: '#2C1E16', 
    margin: '0 0 12px 0', 
    fontWeight: '700',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: '44px', 
  },
  footer: {
    marginTop: 'auto', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { 
    fontSize: '17px', 
    fontWeight: '800', 
    color: '#8B0000', 
    margin: 0,
  },
  button: { 
    backgroundColor: '#FFF0F0', 
    color: '#8B0000',
    border: 'none', 
    padding: '8px 14px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#8B0000',
    color: '#FFF',
  },
  buttonText: {
    fontSize: '13px'
  },

  toastContainer: {
    position: 'fixed',
    top: '100px', 
    right: '30px', 
    backgroundColor: '#fff',
    borderLeft: '5px solid #8B0000',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    padding: '15px 20px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    zIndex: 999999, 
  },
  toastIcon: {
    width: '24px',
    height: '24px',
    backgroundColor: '#8B0000',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  toastContent: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  toastTitle: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '15px',
    marginBottom: '4px'
  },
  toastMessage: {
    color: '#666',
    fontSize: '14px'
  }
};

export default ProductCard;