
import React from 'react';
const featuresData = [
  {
    id: 1,
    title: "Thương hiệu nổi tiếng",
    desc: "Thương hiệu nổi tiếng uy tín số 1 VN về cafe sạch",
    icon: "images/brand.png" 
  },
  {
    id: 2,
    title: "VUA CAFE SẠCH",
    desc: "Duy nhất danh hiệu VUA CAFE SẠCH giúp bảo chứng vị thế duy nhất cho khách hàng",
    icon: "images/king.png"
  },
  {
    id: 3,
    title: "ĐỊNH VỊ, THAY ĐỔI GU THÓI QUEN",
    desc: "Thương hiệu đầu tiên giúp ĐỊNH VỊ, THAY ĐỔI GU THÓI QUEN uống cafe sạch của người Việt (giúp tăng uy tín & tự hào, yên tâm, cho chủ quán khi dùng cafe sạch của chúng tôi)",
    icon: "images/daily-tasks.png"
  },
  {
    id: 4,
    title: "Chất lượng đầu vào khắt khe",
    desc: "Chất lượng đầu vào khắt khe, bắn màu, xuất khẩu, sàng 18, kỹ thuật rang SCA, trăm mẻ như 1, hot air hồi khí, từ nông trại đến bàn ăn, khép kín...",
    icon: "images/quality-assurance.png"
  },
  {
    id: 5,
    title: "Công nghệ cafe sạch 4.0",
    desc: "Thương hiệu đầu tiên tại VN áp dụng công nghệ cafe sạch 4.0, phổ cập kiến thức tại web caphenguyenchat.vn cho người Việt",
    icon: "images/clean.png"
  },
  {
    id: 6,
    title: "Bao bì sạch 4.0",
    desc: "Thương hiệu đầu tiên sử dụng bao bì sạch 4.0: giấy KHỬ KHUẨN, an toàn cho sức khỏe, thân thiện môi trường",
    icon: "images/clean.png"
  }
];

const Features = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.mainTitle}>CÀ PHÊ NGUYÊN CHẤT VỚI 6 ĐẲNG CẤP KHÁC BIỆT</h2>
      
      <div style={styles.grid}>
        {featuresData.map((item, index) => (
          <div key={item.id} style={getGridItemStyle(index, featuresData.length)}>
            
            <div style={styles.iconWrapper}>
              <img src={item.icon} alt={item.title} style={styles.iconImg} />
            </div>
            <div style={styles.textWrapper}>
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.desc}>{item.desc}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '60px auto',
    padding: '0 20px',
  },
  mainTitle: {
    textAlign: 'center',
    color: '#A01515',
    fontSize: '28px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', 
  },
  iconWrapper: {
    flexShrink: 0, 
    marginRight: '20px'
  },
  iconImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '8px',
    fontWeight: '600'
  },
  desc: {
    fontSize: '15px',
    color: '#666',
    lineHeight: '1.6'
  }
};

const getGridItemStyle = (index, totalItems) => {
  const isLeftColumn = index % 2 === 0; 
  const isLastRow = index >= totalItems - 2; 

  return {
    display: 'flex',
    padding: '30px',
    borderRight: isLeftColumn ? '1px solid #eaeaea' : 'none',
    borderBottom: !isLastRow ? '1px solid #eaeaea' : 'none'
  };
};

export default Features;