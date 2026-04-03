// File: src/components/BannerSlider.jsx
import React, { useState } from 'react';

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

  return (
    <div style={styles.sliderContainer}>
      <button onClick={prevSlide} style={{ ...styles.navButton, left: '20px' }}>
        &#10094;
      </button>

      <img 
        src={banners[currentIndex]} 
        alt={`Banner ${currentIndex + 1}`} 
        style={styles.image} 
      />
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
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'opacity 0.5s ease-in-out'
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
    transition: '0.3s'
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: '0.3s'
  }
};

export default BannerSlider;