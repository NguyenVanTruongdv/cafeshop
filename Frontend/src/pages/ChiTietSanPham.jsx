import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const API_URL = 'http://localhost:5224/api/products';

const ChiTietSanPham = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
          throw new Error('Sản phẩm không tồn tại');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Không thể tải sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Đang tải thông tin sản phẩm...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>{error}</h2>;
  }

  if (!product) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Sản phẩm không tồn tại!</h2>;
  }

  const imageSrc = product.urlImgMain || product.Images?.[0]?.imageUrl || 'https://placehold.co/500x500/8B0000/FFF?text=Hinh+Anh+Loi';
  const price = product.Variants?.[0]?.price ?? 0;
  const type = product.categoryName || 'Sản phẩm';

  return (
    <div style={styles.container}>
      
      <div style={styles.topSection}>
        {/* Cột Trái: Đổi hình ảnh "chết" thành hình ảnh "động" */}
        <div style={styles.imageCol}>
          <img 
            src={imageSrc}
            alt={product.name} 
            style={styles.mainImage}
            onError={(e) => { e.target.src = 'https://placehold.co/500x500/8B0000/FFF?text=Hinh+Anh+Loi'; }}
          />
          <div style={styles.thumbnailList}>
            {(product.Images || []).map((img, index) => (
              <img
                key={index}
                src={img.imageUrl || img.ImageUrl || imageSrc}
                alt={`thumb${index + 1}`}
                style={styles.thumbnail}
                onError={(e) => { e.target.src = 'https://placehold.co/100x100/8B0000/FFF?text=Loi'; }}
              />
            ))}
          </div>
        </div>

        {/* Cột Phải: Đổi Tên và Giá thành dữ liệu "động" */}
        <div style={styles.infoCol}>
          <h1 style={styles.productName}>{product.name}</h1>
          
          <div style={styles.redLine}></div>

          <p style={styles.productPrice}>{price > 0 ? `${price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}</p>
          
          <p style={styles.shortDesc}>
            {product.description || 'Mô tả sản phẩm sẽ hiển thị ở đây khi dữ liệu từ backend có sẵn.'}
          </p>

          <div style={styles.metaInfo}>
            <p><strong>Phân loại:</strong> <span>{type}</span></p>
            <p><strong>Tình trạng:</strong> <span style={{color: 'green'}}>Còn hàng</span></p>
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
              onClick={() => addToCart({
                variantId: product.Variants?.[0]?.id ?? product.id,
                name: product.name,
                price,
                image: imageSrc,
              }, quantity)}
            >
              🛒 THÊM VÀO GIỎ HÀNG
            </button>
            <button
              style={styles.buyNowBtn}
              onClick={() => {
                addToCart({
                  variantId: product.Variants?.[0]?.id ?? product.id,
                  name: product.name,
                  price,
                  image: imageSrc,
                }, quantity);
                navigate('/gio-hang');
              }}
            >
              MUA NGAY
            </button>
          </div>
        </div>
      </div>
     <div style={styles.bottomSection}>
        <h2 style={styles.descTitle}>MÔ TẢ SẢN PHẨM</h2>
        <div style={styles.descContent}>
          {product.description ? (
            <p>{product.description}</p>
          ) : (
            <p>Thông tin mô tả sản phẩm đang được cập nhật từ cơ sở dữ liệu.</p>
          )}

          {product.Variants && product.Variants.length > 0 && (
            <>
              <h3>Thông số sản phẩm</h3>
              <ul>
                {product.Variants.map((variant) => (
                  <li key={variant.id}>
                    {variant.weight ? `${variant.weight}g` : 'Ký thước chưa xác định'} - {variant.price ? `${variant.price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

    </div>
    
    
  );
};

// --- CSS INLINE ---
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#fff'
  },
  
  // KHU VỰC 1
  topSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '50px',
    marginBottom: '60px'
  },
  
  // Cột Trái (Ảnh)
  imageCol: {
    flex: '1 1 450px',
  },
  mainImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #eee',
    marginBottom: '15px'
  },
  thumbnailList: {
    display: 'flex',
    gap: '10px'
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #ddd',
    cursor: 'pointer'
  },

  // Cột Phải (Thông tin)
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
    color: '#8B0000', // Đỏ đô
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
    marginBottom: '30px',
    lineHeight: '1.8'
  },
  
  // Chọn số lượng
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px'
  },
  quantityLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '20px'
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

  // KHU VỰC 2 (Mô tả)
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
  }
};

export default ChiTietSanPham;