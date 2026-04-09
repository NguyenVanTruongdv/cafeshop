import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { coffeeProducts } from '../services/mockData';

const SanPham = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [toast, setToast] = useState({
    show: false,
    message: '',
  });
  const handleAddToCart = (productName) => {
    setToast({
      show: true,
      message: `Đã thêm vào giỏ hàng thành công!`
    });

    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const displayedProducts = categoryFilter === 'all' 
    ? coffeeProducts 
    : coffeeProducts.filter(p => p.category === categoryFilter);

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>DANH MỤC SẢN PHẨM</h1>
      
      <div style={styles.toolbar}>
        <div style={styles.resultsText}>
          Hiển thị 1–{displayedProducts.length} của {displayedProducts.length} kết quả
        </div>
        <div style={styles.filterWrapper}>
          <select 
            style={styles.selectFilter}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Tất cả sản phẩm</option>
            <option value="hat">Cà phê hạt nguyên chất</option>
            <option value="bot">Cà phê bột rang xay</option>
            <option value="may">Cà phê pha máy (Espresso)</option>
          </select>
        </div>
      </div>

      <div style={styles.productGrid}>
        {displayedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </div>

      {displayedProducts.length === 0 && (
        <p style={styles.emptyMsg}>Không tìm thấy sản phẩm nào phù hợp.</p>
      )}

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
    margin: '40px auto', 
    padding: '0 20px', 
    minHeight: '80vh',
    position: 'relative' 
  },
  pageTitle: { 
    fontSize: '24px', 
    color: '#8B0000', 
    textAlign: 'center', 
    marginBottom: '40px', 
    textTransform: 'uppercase', 
    fontWeight: 'bold' 
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '35px',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    flexWrap: 'wrap',
    gap: '20px'
  },
  resultsText: {
    fontSize: '15px',
    color: '#666'
  },
  filterWrapper: {
    position: 'relative'
  },
  selectFilter: {
    padding: '10px 40px 10px 15px',
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none', 
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    minWidth: '220px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  productGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
    gap: '30px' 
  },
  emptyMsg: { 
    textAlign: 'center', 
    marginTop: '50px', 
    color: '#888',
    fontStyle: 'italic'
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

export default SanPham;