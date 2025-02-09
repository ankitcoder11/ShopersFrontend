import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import LargeButton from '../../utiles/LargeButton';
import { useNavigate } from 'react-router-dom';

const AutoImageSlider = () => {
  const data = [
    {
      image: "https://fashionopolism-secret-sale.myshopify.com/cdn/shop/files/Slide___secondary.jpg?v=1643325390&width=1200",
      heading: "Summer Collection",
      para: "Discover the vibrant colors and textures of the summer collection.",
      buttonText: "Shop Now",
      link: '/products/womens/tops'
    },
    {
      image: "https://fashionopolism-galleria.myshopify.com/cdn/shop/files/gallerie-002.jpg?v=1614313030&width=1200",
      heading: "Give the Gift of time",
      para: "Show stopping timepieces",
      buttonText: "Explore",
      link: '/products/mens/watches'
    },
    {
      image: "https://enterprise-theme-digital.myshopify.com/cdn/shop/files/Grit-X-Pro_Titan-Animation-beautyshot-1_CROP4b.jpg?v=1676474692&width=1400",
      heading: "Smart tech.Smart prices.",
      para: "Save up to 50% on over 1,000 products!",
      buttonText: "View Collection",
      link: '/products/electronics'
    }
  ];

  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startTouch, setStartTouch] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleSwipeStart = (e) => {
    const touchStart = e.touches ? e.touches[0].clientX : e.clientX;
    setStartTouch(touchStart);
    setIsDragging(true);
  };

  const handleSwipeMove = (e) => {
    if (startTouch === 0) return;

    const touchMove = e.touches ? e.touches[0].clientX : e.clientX;

    if (touchMove === undefined) return;

    const swipeDistance = startTouch - touchMove;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) nextSlide();
      else prevSlide();
      setStartTouch(0);
      setIsDragging(false);
    }
  };

  const handleSwipeEnd = () => {
    setStartTouch(0);
    setIsDragging(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sliderRef} className="overflow-hidden relative"
      onTouchStart={handleSwipeStart} onTouchMove={handleSwipeMove} onTouchEnd={handleSwipeEnd}
      onMouseDown={handleSwipeStart} onMouseMove={handleSwipeMove} onMouseUp={handleSwipeEnd}
      onMouseLeave={handleSwipeEnd}
    >
      <div
        className="w-full h-screen max-[500px]:h-[55vh] bg-no-repeat bg-cover text-white flex items-center justify-center p-10 transition-all duration-500"
        style={{ backgroundImage: `url(${data[currentImageIndex].image})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
        <div className="z-[1] flex flex-col justify-center items-center gap-[10px]">
          <h1 className="text-4xl max-[500px]:text-xl font-bold uppercase animate__animated animate__fadeIn text-center">{data[currentImageIndex].heading}</h1>
          <p className="text-lg max-[500px]:text-[14px] text-center animate__animated animate__fadeIn">{data[currentImageIndex].para}</p>
          <LargeButton onClick={() => navigate(`${data[currentImageIndex].link}`)}
            text={data[currentImageIndex].buttonText}
            className='border-none'
          />
        </div>

        <div
          onClick={prevSlide}
          className="absolute max-[550px]:hidden left-5 max-[500px]:left-1 top-1/2 transform -translate-y-1/2 text-white text-4xl max-[500px]:text-[25px] cursor-pointer hover:bg-white hover:text-black p-2 max-[500px]:p-1 rounded-full"
        >
          <MdKeyboardArrowLeft />
        </div>
        <div
          onClick={nextSlide}
          className="absolute max-[550px]:hidden right-5 max-[500px]:right-1 top-1/2 transform -translate-y-1/2 text-white text-4xl max-[500px]:text-[25px] cursor-pointer hover:bg-white hover:text-black p-2 max-[500px]:p-1 rounded-full"
        >
          <MdKeyboardArrowRight />
        </div>
      </div>

      <div className="absolute flex gap-[10px] items-center left-[45%] bottom-[5px] ">
        {data.map((_, index) => (
          <div key={index} onClick={() => setCurrentImageIndex(index)} className={`h-[10px] w-[10px] rounded-full ${index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-400'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default AutoImageSlider;
