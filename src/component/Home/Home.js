import React, { useState } from 'react'
import AutoImageSlider from './AutoImageSlider'
import AdvHome from './AdvHome'
import Category from './Category'
import ProductSlider from './ProductSlider'
import BrandsLogo from './BrandsLogo'
import Banner from './Banner'
import GetDataApi from '../../utiles/GetDataApi'
import TestimonialCarousel from './TestimonialCarousel'

const Home = () => {
    const testimonialsData = [
        {
            title: "Best company ever",
            text: "Care about their customers' needs and really came through. Husband loves his new watch.",
            rating: 5,
        },
        {
            title: "Great service",
            text: "We love dealing with this company. Refreshingly easy experience.",
            rating: 5,
        },
        {
            title: "Great selection",
            text: "Absolutely the best range of watches. Staff are clearly very well trained.",
            rating: 5,
        },
        {
            title: "Amazing Support",
            text: "Customer support was top-notch. They answered all my queries quickly.",
            rating: 4,
        },
        {
            title: "Fast Delivery",
            text: "Received my order in just two days! Super impressed.",
            rating: 5,
        },
    ];
    const [active, setActive] = useState('first');
    const CategoryData = [
        {
            url: 'https://fashionopolism-galleria.myshopify.com/cdn/shop/files/gallerie-006.jpg?v=1614313156&width=1200',
            category: 'MENS',
            para: 'View our extensive range',
            button: 'mens',
            link: 'products/mens'
        },
        {
            url: 'https://fashionopolism-galleria.myshopify.com/cdn/shop/files/gallerie-007.jpg?v=1614313156&width=700',
            category: 'WOMENS',
            para: 'Classic looks and elegant styles',
            button: 'WOMENS',
            link: 'products/womens'
        },
    ]
    const trendingProductsData = GetDataApi('https://fashionopolism-galleria.myshopify.com/collections/our-favourites/products.json');
    return (
        <div className='w-full'>
            <AutoImageSlider />
            <AdvHome />
            <div className='flex justify-center max-[500px]:flex-col p-[20px] gap-[20px]'>
                {CategoryData.map((item, index) => (
                    <Category key={index} url={item.url} category={item.category} para={item.para} button={item.button} link={item.link} />
                ))
                }
            </div>
            {/* <div className='flex flex-col items-center gap-[5px] p-[20px]'>
                <div><h1 className='uppercase font-bold text-[20px] text-textColour font-buttonFont'>Trending</h1></div>
                <div className='border-t-[3px] w-[90px]'></div>
                <ProductSlider productsData={trendingProductsData} />
            </div> */}
            {/* <BrandsLogo /> */}
            <Banner link={'products/mens'} heading={"BUY NOW PAY LATER"} para={"Flexible payment options available"} button={"START SHOPPING"} url={"https://fashionopolism-galleria.myshopify.com/cdn/shop/files/gallerie-008.jpg?v=1614313157&width=1200"} />
            <div className='p-[10px]'></div>
            {/* <div className='flex flex-col items-center gap-[10px] font-bodyFont text-[14px] p-[20px]'>
                <div><h1 className='uppercase font-bold text-[20px] text-textColour font-buttonFont'>HIGHLIGHTS</h1></div>
                <div className='border-t-[3px] w-[90px]'></div>
                <div className='flex gap-[10px]'>
                    <h1 className={active === "first" ? 'border-[2px] border-[#2b2b2b] bg-white text-[#2b2b2b] p-[5px] py-0 font-medium cursor-pointer' : 'border-[2px] border-[#2b2b2b] bg-[#2b2b2b] text-white p-[5px] py-0 font-medium cursor-pointer'} onClick={() => { setActive("first") }}>Dress Watches</h1>
                    <h1 className={active === "second" ? 'border-[2px] border-[#2b2b2b] bg-white text-[#2b2b2b] p-[5px] py-0 font-medium cursor-pointer' : 'border-[2px] border-[#2b2b2b] bg-[#2b2b2b] text-white p-[5px] py-0 font-medium cursor-pointer'} onClick={() => { setActive("second") }}>Most Wanted</h1>
                </div>
                <ProductSlider productsData={trendingProductsData} />
            </div> */}
            <Banner heading={"DON'T JUST TAKE OUR WORD FOR IT"} para={"What our customers are saying..."} url={"https://fashionopolism-galleria.myshopify.com/cdn/shop/files/gallerie-004.jpg?v=1614313147&width=1200"} />
            <div className='p-[20px]'><TestimonialCarousel testimonialsData={testimonialsData} /></div>
        </div>
    )
}

export default Home