import React, { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const AutoImageSlider = () => {
  const data = ["https://fashionopolism-secret-sale.myshopify.com/cdn/shop/files/Slide___secondary.jpg?v=1643325390&width=1200",
    "https://fashionopolism-galleria.myshopify.com/cdn/shop/files/gallerie-002.jpg?v=1614313030&width=1200",
    "https://enterprise-theme-digital.myshopify.com/cdn/shop/files/Grit-X-Pro_Titan-Animation-beautyshot-1_CROP4b.jpg?v=1676474692&width=1400",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    currentImageIndex < data.length-1 ? setCurrentImageIndex(currentImageIndex+1):setCurrentImageIndex(0);
  };

  const prevSlide = () => {
    currentImageIndex === 0 ? setCurrentImageIndex(data.length-1):setCurrentImageIndex(currentImageIndex-1);
  };
  return (
    <div className='overflow-hidden'>
      <div className='w-full h-screen bg-no-repeat bg-cover text-[25px] max-[430px]:text-[20px] cursor-pointer flex items-center justify-between p-[10px]'
        style={{ backgroundImage: `url(${data[currentImageIndex]})` }}>
        <div onClick={prevSlide} className='text-white hover:border hover:rounded-full hover:bg-white hover:text-black'><MdKeyboardArrowLeft /></div>
        <div onClick={nextSlide} className='text-white hover:border hover:rounded-full hover:bg-white hover:text-black'><MdKeyboardArrowRight /></div>
      </div>
    </div>
  )
}

export default AutoImageSlider