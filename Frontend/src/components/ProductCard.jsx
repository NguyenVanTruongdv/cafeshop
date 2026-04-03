import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={styles.card}>
      <Link to={`/san-pham/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={styles.image}
          onError={(e) => { e.target.src = 'https://placehold.co/300x300/8B0000/FFF?text=Hinh+Anh+Loi'; }}
        />
      </Link>

      <div style={styles.info}>
        <Link to={`/san-pham/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={styles.name}>{product.name}</h3>
        </Link>
        <p style={styles.type}>Phân loại: {product.type}</p>
        <p style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</p>
        
        <button onClick={() => addToCart(product)} style={styles.button}>Thêm vào giỏ</button>
      </div>
    </div>
  );
};


const styles = {
  card: { 
    border: '1px solid #ddd', 
    borderRadius: '8px', 
    overflow: 'hidden', 
    backgroundColor: '#fff', 
    textAlign: 'center', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
    transition: 'transform 0.2s' },
  image: { 
    width: '100%', 
    height: '250px', 
    objectFit: 'cover', 
    display: 'block' },
  info: { 
    padding: '15px' },
  name: { 
    fontSize: '15px', 
    color: '#4B2C20', 
    margin: '0 0 10px 0', 
    minHeight: '45px' },
  type: { 
    fontSize: '13px', 
    color: '#666', 
    marginBottom: '10px' },
  price: { 
    fontSize: '18px', 
    fontWeight: 'bold', 
    color: '#8B0000', 
    marginBottom: '15px' },
  button: { 
    backgroundColor: '#8B0000', 
    color: 'white', 
    border: 'none', 
    padding: '10px 15px', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    width: '100%', 
    fontWeight: 'bold' }
};

export default ProductCard;