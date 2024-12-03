import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import GetDataApi from '../../utiles/API/GetDataApi';
import { CiGlobe } from 'react-icons/ci';
import SingleProduct from './SingleProduct';

const ProductDesc = () => {
    const location = useLocation()
    const [indexImage, setIndexImage] = useState(0);
    const [indexSize, setIndexSize] = useState(0);
    const fullPath = location.pathname;
    const arr = fullPath.split("/")
    const category = arr[2]
    const productId = arr[4];
    const subCategory = arr[3];
    const productsData = GetDataApi(`${process.env.REACT_APP_API_URL}getproduct/get-${category}`);
    const product = productsData?.data?.data.find((product) => product._id === productId);
    const productsMayLike = productsData?.data?.data
        .filter((product) => product._id !== productId && product.category === subCategory)
        .slice(0, 5);
    const size = ['XS', 'S', 'M', 'L', 'XL']
    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);
    return (
        <div>

            <div className='w-[95%] mx-auto py-[20px] flex justify-between font-bodyFont'>
                <div className='w-[59%] flex justify-between'>
                    <div className='w-[15%]'>
                        {product?.imageUrl.map((item, index) => {
                            return (
                                <div key={index} onClick={() => setIndexImage(index)} className={index === indexImage ? 'w-full h-[120px] p-[5px] border-[1.5px] border-black ' : 'w-full h-[120px] cursor-pointer p-[5px] border-[1.5px] border-white'}>
                                    <img className='w-full h-full object-cover' src={item} />
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-[80%] h-[800px]'>
                        <img className='w-full h-full object-cover' src={product?.imageUrl[indexImage]} />
                    </div>
                </div>
                <div className='w-[39%] font-bodyFont flex flex-col gap-[20px]'>
                    <div className='text-[27px] uppercase font-normal'>{product?.name}</div>
                    <div className='text-[20px]'>Rs. {product?.price}</div>
                    <div className='flex  flex-col gap-[10px]'>
                        <div>SIZE</div>
                        <div className='text-[18px] flex gap-[10px]'>
                            {size.map((item, index) => {
                                return (
                                    <p key={index} onClick={() => setIndexSize(index)} className={indexSize === index ? 'p-[5px] px-[10px] border-black border-[1.5px] h-max cursor-pointer' : ' cursor-pointer p-[5px] px-[10px] border-[1.5px] h-max'} > {item}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className='flex items-center gap-[10px] text-[18px]'>
                        <div className='text-[20px]'><CiGlobe /></div>
                        <div>Free worldwide shipping</div>
                    </div>
                    {product?.stock < 10 &&
                        <div className='flex items-center gap-[15px] '>
                            <span class="relative flex h-3 w-3">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f4af29] opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-[#f4af29]"></span>
                            </span>
                            <div>Low stock - {product?.stock} items left</div>
                        </div>
                    }
                    <div className='p-[13px] text-[13px] text-center border-[1px] border-black cursor-pointer'>ADD TO CART</div>
                    <div className='bg-black text-white p-[13px] text-[13px] text-center cursor-pointer'>BUY IT NOW</div>
                    <div>{capitalizeFirstLetter(product?.description)}</div>
                </div>
            </div>
            <div>
                <div className='text-center text-[20px] uppercase font-bodyFont'>You may also like</div>
                <div className='flex w-[95%] gap-[20px] flex-wrap mx-auto py-[20px]'>
                    {productsMayLike?.map((item, index) => {
                        return (
                            <SingleProduct key={index} index={index} data={item} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductDesc