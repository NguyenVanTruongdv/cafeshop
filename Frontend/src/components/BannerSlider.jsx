import React, { useState, useEffect } from 'react';

const BannerSlider = () => {
  const banners = [
    "images/banner1.jpg", 
    "images/banner2.jpg" 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div style={styles.sliderContainer}>
      <button onClick={prevSlide} style={{ ...styles.navButton, left: '20px' }}>
        &#10094;
      </button>
      <div 
        style={{
          ...styles.imageWrapper,
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {banners.map((src, index) => (
          <img 
            key={index}
            src={src} 
            alt={`Banner ${index + 1}`} 
            style={styles.image} 
          />
        ))}
      </div>
      <button onClick={nextSlide} style={{ ...styles.navButton, right: '20px' }}>
        &#10095;
      </button>
      <div style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <span 
            key={index} 
            style={{
              ...styles.dot,
              backgroundColor: currentIndex === index ? '#D4A373' : 'rgba(255,255,255,0.5)'
            }}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sliderContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '1920px',
    height: '500px', 
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5' // Màu nền chờ khi ảnh chưa tải xong
  },
  imageWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s ease-in-out', // Hiệu ứng trượt kéo dài 0.8s
  },
  image: {
    minWidth: '100%', // Ép mỗi bức ảnh phải rộng đúng bằng khung hiển thị
    height: '100%',
    objectFit: 'cover', // Đảm bảo ảnh không bị méo tỉ lệ
    display: 'block'
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    border: '1px solid white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    transition: 'background-color 0.3s'
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    zIndex: 10 // Đảm bảo người dùng có thể click vào dấu chấm
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s'
  }
};

export default BannerSlider;