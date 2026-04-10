import React, { useContext, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  // Thêm state để làm hiệu ứng hover nổi thẻ lên
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = product.urlImgMain || product.image || 'https://placehold.co/300x300/8B0000/FFF?text=Hinh+Anh+Loi';
  const price = product.price ?? product.Variants?.[0]?.price ?? 0;
  const type = product.type || product.categoryName || 'Sản phẩm';
  const variantId = product.variantId ?? product.Variants?.[0]?.id ?? product.id;
  const cardProduct = { ...product, price, image: imageUrl, type, variantId };

  return (
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
        {/* Hiệu ứng overlay nhẹ khi hover */}
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
            onClick={() => addToCart(cardProduct)} 
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
    transform: 'translateY(-5px)', // Nổi nhẹ lên trên
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
    //  Quá 2 dòng tự biến thành dấu ...
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
    backgroundColor: '#FFF0F0', // Nút nền hồng nhạt
    color: '#8B0000', // Chữ đỏ
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
    backgroundColor: '#8B0000', // Hover thì đổi ngược lại: Nền đỏ, chữ trắng
    color: '#FFF',
  },
  buttonText: {
    fontSize: '13px'
  }
};

export default ProductCard;