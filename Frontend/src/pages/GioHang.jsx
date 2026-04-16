import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const GioHang = () => {
  const { cartItems, cartTotal, updateItemQuantity, removeItem, loadCart, loading, error } = useContext(CartContext);

    const handleDecrease = (item) => {
      const currentQty = item.quantity ?? item.qty ?? 1;
      if (currentQty > 1) {
        updateItemQuantity(item.id, currentQty - 1);
      } else if (currentQty === 1) {
        removeItem(item.id);
      }
    };
  

  const handleIncrease = (item) => {
    const currentQty = item.quantity ?? item.qty ?? 1;
    updateItemQuantity(item.id, currentQty + 1);
  };

  const handleRemove = (item) => {
    removeItem(item.id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>GIỎ HÀNG CỦA BẠN</h1>
      {loading ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <h3 style={{color: '#666', marginBottom: '20px'}}>Đang tải giỏ hàng...</h3>
        </div>
      ) : error ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <h3 style={{color: '#d00', marginBottom: '20px'}}>{error}</h3>
          <button style={styles.updateBtn} onClick={loadCart}>Tải lại</button>
        </div>
      ) : cartItems.length === 0 ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <h3 style={{color: '#666', marginBottom: '20px'}}>Giỏ hàng của bạn đang trống!</h3>
          <Link to="/san-pham" style={styles.continueBtn}>
            ← QUAY LẠI MUA SẮM
          </Link>
        </div>
      ) : (
        <div style={styles.cartWrapper}>
          
          <div style={styles.leftCol}>
            <div style={styles.tableResponsive}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}></th>
                    <th style={styles.th}></th>
                    <th style={{...styles.th, textAlign: 'left'}}>SẢN PHẨM</th>
                    <th style={styles.th}>GIÁ</th>
                    <th style={styles.th}>SỐ LƯỢNG</th>
                    <th style={styles.th}>TẠM TÍNH</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td style={styles.tdCenter}>
                        <button style={styles.removeBtn} onClick={() => handleRemove(item)}>
                          ×
                        </button>
                      </td>
                      <td style={styles.tdCenter}>
                        <img
                          src={item.image || 'https://placehold.co/80x80/8B0000/FFF?text=No+Image'}
                          alt={item.productName || 'Sản phẩm'}
                          style={styles.productImg}
                        />
                      </td>
                      <td style={{ ...styles.td, color: '#4a6b8c', fontWeight: 'bold' }}>
                        {item.name || 'Đang cập nhật tên SP...'}
                      </td>
                      <td style={styles.tdCenter}>
                        <strong>{item.price ? item.price.toLocaleString('vi-VN') : 0}₫</strong>
                      </td>
                      <td style={styles.tdCenter}>
                        <div style={styles.qtyBox}>
                          <button style={styles.qtyBtn} onClick={() => handleDecrease(item)}>-</button>
                          <input type="text" value={item.quantity ?? item.qty ?? 1} readOnly style={styles.qtyInput} />
                          <button style={styles.qtyBtn} onClick={() => handleIncrease(item)}>+</button>
                        </div>
                      </td>
                      <td style={styles.tdCenter}>
                        <strong>{((item.price || 0) * (item.quantity ?? item.qty ?? 1)).toLocaleString('vi-VN')}₫</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.actionRow}>
              <Link to="/san-pham" style={styles.continueBtn}>
                ← TIẾP TỤC XEM SẢN PHẨM
              </Link>
              <button style={styles.updateBtn} onClick={loadCart}>
                CẬP NHẬT GIỎ HÀNG
              </button>
            </div>
          </div>
          <div style={styles.rightCol}>
            <div style={styles.summaryBox}>
              <h2 style={styles.summaryTitle}>CỘNG GIỎ HÀNG</h2>
              <table style={styles.summaryTable}>
                <tbody>
                  <tr>
                    <td style={styles.summaryTd}>Tạm tính</td>
                    <td style={{...styles.summaryTd, textAlign: 'right', fontWeight: 'bold'}}>
                      {cartTotal.toLocaleString('vi-VN')}₫
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.summaryTd}>Tổng</td>
                    <td style={{...styles.summaryTd, textAlign: 'right', fontWeight: 'bold', fontSize: '18px', color: '#8B0000'}}>
                      {cartTotal.toLocaleString('vi-VN')}₫
                    </td>
                  </tr>
                </tbody>
              </table>
             <Link to="/thanh-toan" style={{...styles.checkoutBtn, display: 'block', textAlign: 'center', textDecoration: 'none'}}>
               TIẾN HÀNH THANH TOÁN
             </Link>
            </div>
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
    backgroundColor: '#fff', 
    minHeight: '60vh' 
  },
  pageTitle: { 
    fontSize: '24px', 
    color: '#8B0000', 
    marginBottom: '30px', 
    textTransform: 'uppercase', 
    borderBottom: '2px solid #8B0000', 
    paddingBottom: '10px', 
    display: 'inline-block' 
  },
  cartWrapper: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '30px', 
    alignItems: 'flex-start' 
  },
  leftCol: { 
    flex: '2 1 700px' 
  },
  tableResponsive: { 
    overflowX: 'auto', 
    marginBottom: '20px' 
  },
  table: { 
    width: '100%', 
    borderCollapse: 'collapse', 
    minWidth: '600px' 
  },
  th: { 
    padding: '15px', 
    border: '1px solid #eaeaea', 
    backgroundColor: '#fdfdfd', 
    color: '#666', 
    fontSize: '14px', 
    textAlign: 'center' 
  },
  td: { 
    padding: '15px', 
    border: '1px solid #eaeaea', 
    fontSize: '15px', 
    color: '#333' 
  },
  tdCenter: { 
    padding: '15px', 
    border: '1px solid #eaeaea', 
    textAlign: 'center', 
    fontSize: '15px' 
  },
  removeBtn: { 
    background: 'none', 
    border: '1px solid #ccc', 
    borderRadius: '50%', 
    width: '24px', 
    height: '24px', 
    cursor: 'pointer', 
    color: '#999', 
    fontSize: '16px', 
    display: 'inline-flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  productImg: { 
    width: '60px', 
    height: 'auto', 
    display: 'block', 
    margin: '0 auto' 
  },
  qtyBox: { 
    display: 'inline-flex', 
    border: '1px solid #ddd', 
    borderRadius: '3px' 
  },
  qtyBtn: { 
    background: '#f9f9f9', 
    border: 'none', 
    padding: '5px 10px', 
    cursor: 'pointer', 
    color: '#555' 
  },
  qtyInput: { 
    width: '40px', 
    textAlign: 'center', 
    border: 'none', 
    borderLeft: '1px solid #ddd', 
    borderRight: '1px solid #ddd', 
    outline: 'none' 
  },
  actionRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap', 
    gap: '15px' 
  },
  continueBtn: { 
    textDecoration: 'none', 
    color: '#8B0000', 
    border: '2px solid #8B0000', 
    padding: '10px 20px', 
    fontWeight: 'bold', 
    fontSize: '14px', 
    backgroundColor: 'transparent', 
    display: 'inline-block', 
    transition: '0.3s' 
  },
  updateBtn: { 
    backgroundColor: '#A7665D', 
    color: 'white', 
    border: 'none', 
    padding: '12px 20px', 
    fontWeight: 'bold', 
    fontSize: '14px', 
    cursor: 'pointer' 
  },
  rightCol: { 
    flex: '1 1 350px' 
  },
  summaryBox: { 
    border: '1px solid #eaeaea', 
    padding: '30px 20px', 
    backgroundColor: '#fdfdfd' 
  },
  summaryTitle: { 
    fontSize: '16px', 
    color: '#555', 
    borderBottom: '1px solid #eaeaea', 
    paddingBottom: '15px', 
    marginBottom: '20px', 
    textAlign: 'center' 
  },
  summaryTable: { 
    width: '100%', 
    borderCollapse: 'collapse', 
    marginBottom: '25px' 
  },
  summaryTd: { 
    padding: '15px 10px', 
    border: '1px solid #eaeaea', 
    color: '#555' 
  },
  checkoutBtn: { 
    width: '100%', 
    backgroundColor: '#D16B4A', 
    color: 'white', 
    border: 'none', 
    padding: '15px', 
    fontSize: '16px', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s' 
  }
};
export default GioHang;