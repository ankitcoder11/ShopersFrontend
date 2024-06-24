import React from 'react'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'

const AutoImageSlider = () => {
  const data = ["https://fashionopolism-secret-sale.myshopify.com/cdn/shop/files/Slide___secondary.jpg?v=1643325390&width=1200",
    "https://fashionopolism-galleria.myshopify.com/cdn/shop/files/gallerie-002.jpg?v=1614313030&width=1200",
    "https://enterprise-theme-digital.myshopify.com/cdn/shop/files/Grit-X-Pro_Titan-Animation-beautyshot-1_CROP4b.jpg?v=1676474692&width=1400",
  ];
  return (
    <div className='overflow-hidden'>
      <div className={`w-screen h-screen`} style={{ backgroundImage: `url(${data[0]})` }}>
        <FaCircleChevronRight />
        {/* <img src={data[0]} className='w-full h-full' /> */}
        <FaCircleChevronLeft />
      </div>
    </div>
  )
}

export default AutoImageSlider