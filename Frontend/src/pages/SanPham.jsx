import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const SanPham = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Không thể tải sản phẩm từ server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayedProducts = categoryFilter === 'all'
    ? products
    : products.filter(p => p.categoryName === categoryFilter);

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>DANH MỤC SẢN PHẨM</h1>
      <div style={styles.toolbar}>
        <div style={styles.resultsText}>
          Hiển thị 1–{displayedProducts.length} của {products.length} kết quả
        </div>
        <div style={styles.filterWrapper}>
          <select 
            style={styles.selectFilter}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Tất cả sản phẩm</option>
            <option value="Cà phê hạt">Cà phê hạt nguyên chất</option>
            <option value="Cà phê rang xay">Cà phê rang xay</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p style={styles.emptyMsg}>Đang tải sản phẩm...</p>
      ) : error ? (
        <p style={styles.emptyMsg}>{error}</p>
      ) : (
        <>
          <div style={styles.productGrid}>
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {displayedProducts.length === 0 && (
            <p style={styles.emptyMsg}>Không tìm thấy sản phẩm nào phù hợp.</p>
          )}
        </>
      )}
    </div>
  );
};
const styles = {
  container: { 
    maxWidth: '1200px', 
    margin: '40px auto', 
    padding: '0 20px', 
    minHeight: '80vh' 
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
  }
};

export default SanPham;