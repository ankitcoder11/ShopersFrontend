import React, { useState, useEffect } from 'react';
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

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        className="w-full h-screen bg-no-repeat bg-cover text-white flex items-center justify-center p-10 transition-all duration-500"
        style={{ backgroundImage: `url(${data[currentImageIndex].image})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
        <div className="z-10 flex flex-col justify-center items-center gap-[10px]">
          <h1 className="text-4xl font-bold uppercase animate__animated animate__fadeIn">{data[currentImageIndex].heading}</h1>
          <p className="text-lg animate__animated animate__fadeIn">{data[currentImageIndex].para}</p>
          <LargeButton
            onClick={() => navigate(`${data[currentImageIndex].link}`)}
            text={data[currentImageIndex].buttonText}
            className='border-none'
          />
        </div>

        <div
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-4xl cursor-pointer hover:bg-white hover:text-black p-2 rounded-full"
        >
          <MdKeyboardArrowLeft />
        </div>
        <div
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-4xl cursor-pointer hover:bg-white hover:text-black p-2 rounded-full"
        >
          <MdKeyboardArrowRight />
        </div>
      </div>
    </div>
  );
};

export default AutoImageSlider;
