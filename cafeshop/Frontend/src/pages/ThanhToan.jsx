
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ThanhToan = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  const shippingFee = cartTotal > 500000 ? 0 : 30000; 
  const finalTotal = cartTotal + shippingFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("FE2: Viết logic lấy thông tin Form + Giỏ hàng để lưu vào bảng Order, OrderDetail và Address nhé!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>THANH TOÁN</h1>

      <form onSubmit={handlePlaceOrder} style={styles.checkoutWrapper}>
        
        <div style={styles.leftCol}>
          <h2 style={styles.sectionTitle}>THÔNG TIN THANH TOÁN</h2>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Họ và tên người nhận *</label>
            <input type="text" placeholder="Nhập họ tên đầy đủ" style={styles.input} required />
          </div>

          <div style={styles.rowInput}>
            <div style={{...styles.inputGroup, flex: 1}}>
              <label style={styles.label}>Số điện thoại *</label>
              <input type="tel" placeholder="Ví dụ: 0912345678" style={styles.input} required />
            </div>
            <div style={{...styles.inputGroup, flex: 1}}>
              <label style={styles.label}>Địa chỉ Email</label>
              <input type="email" placeholder="Để nhận hóa đơn" style={styles.input} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Địa chỉ giao hàng chi tiết *</label>
            <input type="text" placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." style={styles.input} required />
          </div>
          <div style={styles.mapSection}>
            <label style={styles.label}>📍 Chọn vị trí trên bản đồ để giao hàng chính xác hơn (Tùy chọn)</label>
            <p style={{fontSize: '13px', color: '#666', marginBottom: '10px'}}>
              *FE2: Thay iframe này bằng thư viện Google Maps API để khách có thể kéo thả ghim (Pin) và lấy tọa độ Latitude/Longitude lưu vào bảng Address.
            </p>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954051012345!2d106.6778103!3d10.7380128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad027e3727%3A0x2a77b414e887f86d!2s180%20Cao%20L%E1%BB%97%2C%20Ph%Ccedil;%E1%BB%9Dng%204%2C%20Qu%E1%BA%ADn%208%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
              width="100%" 
              height="250" 
              style={{ border: 0, borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy"
              title="Map Picker"
            ></iframe>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Ghi chú đơn hàng</label>
            <textarea placeholder="Ghi chú về giao hàng, ví dụ: Giao giờ hành chính..." style={styles.textarea} rows="4"></textarea>
          </div>
        </div>

        <div style={styles.rightCol}>
          <div style={styles.orderBox}>
            <h2 style={styles.sectionTitle}>ĐƠN HÀNG CỦA BẠN</h2>
            
            <table style={styles.orderTable}>
              <thead>
                <tr>
                  <th style={styles.thLeft}>SẢN PHẨM</th>
                  <th style={styles.thRight}>TẠM TÍNH</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td style={styles.tdLeft}>
                      {item.name} <strong style={{color: '#8B0000'}}>x {item.qty}</strong>
                    </td>
                    <td style={styles.tdRight}>
                      {(item.price * item.qty).toLocaleString('vi-VN')}₫
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={styles.tdLeft}><strong>Tạm tính giỏ hàng</strong></td>
                  <td style={styles.tdRight}><strong>{cartTotal.toLocaleString('vi-VN')}₫</strong></td>
                </tr>
                <tr>
                  <td style={styles.tdLeft}>Giao hàng</td>
                  <td style={styles.tdRight}>
                    {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}
                  </td>
                </tr>
                <tr>
                  <td style={{...styles.tdLeft, fontSize: '18px'}}><strong>TỔNG TIỀN</strong></td>
                  <td style={{...styles.tdRight, fontSize: '20px', color: '#8B0000'}}>
                    <strong>{finalTotal.toLocaleString('vi-VN')}₫</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div style={styles.paymentMethods}>
              <div style={styles.radioGroup}>
                <input type="radio" id="cod" name="payment" defaultChecked style={styles.radio} />
                <label htmlFor="cod" style={styles.radioLabel}>Thanh toán khi nhận hàng (COD)</label>
              </div>
              <div style={styles.paymentDesc}>
                Khách hàng thanh toán bằng tiền mặt khi Shipper giao hàng tới.
              </div>

              <div style={styles.radioGroup}>
                <input type="radio" id="bank" name="payment" style={styles.radio} />
                <label htmlFor="bank" style={styles.radioLabel}>Chuyển khoản ngân hàng</label>
              </div>
            </div>


            <button type="submit" style={styles.submitBtn}>
              XÁC NHẬN ĐẶT HÀNG
            </button>
          </div>
        </div>

      </form>
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
  
  checkoutWrapper: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '40px', 
    alignItems: 'flex-start' 
},
  
  leftCol: { 
    flex: '2 1 600px' 
},
  sectionTitle: { 
    fontSize: '18px', 
    color: '#333', 
    marginBottom: '20px', 
    borderBottom: '1px solid #eee', 
    paddingBottom: '10px' 
},
  inputGroup: { 
    marginBottom: '20px' 
},
  rowInput: { 
    display: 'flex', 
    gap: '20px', 
    flexWrap: 'wrap' 
},
  label: { 
    display: 'block', 
    fontSize: '14px', 
    color: '#333', 
    fontWeight: 'bold', 
    marginBottom: '8px' 
},
  input: { 
    width: '100%', 
    padding: '12px 15px', 
    border: '1px solid #ccc', 
    borderRadius: '4px', 
    fontSize: '15px', 
    outline: 'none', 
    boxSizing: 'border-box', 
    fontFamily: 'inherit' 
},
  textarea: { 
    width: '100%', 
    padding: '12px 15px', 
    border: '1px solid #ccc', 
    borderRadius: '4px', 
    fontSize: '15px', 
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit', 
    resize: 'vertical' 
},
  mapSection: { 
    marginBottom: '25px', 
    padding: '15px', 
    backgroundColor: '#fcf9f2', 
    border: '1px dashed #ccc', 
    borderRadius: '8px' 
},

  rightCol: { 
    flex: '1 1 400px' 
},
  orderBox: { 
    border: '2px solid #8B0000', 
    padding: '30px 20px', 
    borderRadius: '8px', 
    backgroundColor: '#fdfdfd' 
},
  orderTable: { 
    width: '100%', 
    borderCollapse: 'collapse', 
    marginBottom: '20px' 
},
  thLeft: { 
    textAlign: 'left', 
    padding: '10px 0', 
    borderBottom: '2px solid #eaeaea', 
    color: '#333' 
},
  thRight: { 
    textAlign: 'right', 
    padding: '10px 0', 
    borderBottom: '2px solid #eaeaea', 
    color: '#333' 
},
  tdLeft: { 
    textAlign: 'left', 
    padding: '15px 0', 
    borderBottom: '1px solid #eaeaea', 
    color: '#555', 
    fontSize: '15px' 
},
  tdRight: { 
    textAlign: 'right', 
    padding: '15px 0', 
    borderBottom: '1px solid #eaeaea', 
    color: '#333', 
    fontSize: '15px' 
},
  
  paymentMethods: { 
    marginTop: '20px', 
    marginBottom: '20px', 
    backgroundColor: '#fff', 
    padding: '15px', 
    border: '1px solid #eaeaea', 
    borderRadius: '4px'
 },
  radioGroup: { 
    display: 'flex', 
    alignItems: 'center', 
    marginBottom: '10px'
 },
  radio: { 
    marginRight: '10px', 
    transform: 'scale(1.2)', 
    accentColor: '#8B0000'
 },
  radioLabel: { 
    fontSize: '15px', 
    fontWeight: 'bold', 
    color: '#333', 
    cursor: 'pointer' 
},
  paymentDesc: { 
    padding: '10px 15px', 
    backgroundColor: '#f5f5f5', 
    fontSize: '14px', 
    color: '#666', 
    marginBottom: '15px', 
    borderRadius: '4px', 
    borderLeft: '3px solid #8B0000' 
},
  
  policyText: { 
    fontSize: '13px', 
    color: '#666', 
    lineHeight: '1.5', 
    marginBottom: '20px'
 },
  submitBtn: { 
    width: '100%', 
    backgroundColor: '#D16B4A', 
    color: 'white', 
    border: 'none', 
    padding: '16px', 
    fontSize: '16px', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    borderRadius: '4px', 
    transition: 'background-color 0.3s'
 }
};

export default ThanhToan;