import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CiGlobe } from 'react-icons/ci';
import SingleProduct from './SingleProduct';
import { fetchProducts } from '../../api/products';
import Loader from '../../utiles/Loader';
import { addToCart } from '../../api/cart';
import { MyContext } from '../contextApi/MyContext';
import toast from 'react-hot-toast';
import LargeButton, { ButtonWhite } from '../../utiles/LargeButton';
import ProductImageSlider from './ProductImageSlider';

const ProductDesc = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [indexImage, setIndexImage] = useState(0);
    const [indexSize, setIndexSize] = useState(0);
    const [productsData, setProductsData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [addingItemToCart, setAddingItemToCart] = useState(false)
    const [buyNowLoading, setBuyNowLoading] = useState(false)
    const fullPath = location.pathname;
    const arr = fullPath.split("/")
    const category = arr[2]
    const productId = arr[4];
    const subCategory = arr[3];

    const { user, fetchCartItems } = useContext(MyContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProducts(category);
                setProductsData(response?.data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [category]);

    const product = productsData?.find((product) => product._id === productId);
    const productsMayLike = productsData
        ?.filter((product) => product._id !== productId && product.category === subCategory)
        ?.slice(0, 5);

    // const size = ['XS', 'S', 'M', 'L', 'XL']

    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    // Add item to the cart
    const handleAddToCart = async (productId, quantity, mainCategory, value) => {
        if (user) {
            if (value) setBuyNowLoading(true)
            else setAddingItemToCart(true)
            const userId = user;
            try {
                const data = { userId, productId, quantity, mainCategory };
                const response = await addToCart(data);
                await fetchCartItems();
                if (!value) toast.success(response?.message)
                if (value) navigate(`/protected/checkout?single=true&productId=${product?._id}`)
            } catch (err) {
                toast.error("Error while adding item to cart")
            } finally {
                setAddingItemToCart(false);
                setBuyNowLoading(false)
            }
        } else {
            toast.error("Please login first")
        }
    };

    return (
        <div>
            {isLoading ? <Loader /> :
                <div className='w-[95%] mx-auto py-[20px] flex max-[768px]:flex-col justify-between font-bodyFont'>
                    <div className='max-[768px]:hidden w-[59%] flex justify-between'>
                        <div className='w-[15%]'>
                            {product?.imageUrl.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => setIndexImage(index)} className={index === indexImage ? 'w-full h-[120px] p-[5px] border-[1.5px] border-black ' : 'w-full h-[120px] cursor-pointer p-[5px] border-[1.5px] border-white'}>
                                        <img className='w-full h-full object-cover' src={item} alt='Some error while loading' />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='w-[80%] h-[800px] max-[900px]:h-[500px]'>
                            <img className='w-full h-full object-cover' src={product?.imageUrl[indexImage]} alt='Some error while loading' />
                        </div>
                    </div>
                    <div className='min-[769px]:hidden max-w-[1200px] w-full aspect-[10/12] pb-[20px] mx-auto relative'><ProductImageSlider images={product?.imageUrl} /></div>
                    <div className='w-[39%] max-[768px]:w-full font-bodyFont flex flex-col gap-[20px]'>
                        <div className='text-[27px] uppercase font-normal'>{product?.name}</div>
                        <div className='text-[20px]'>Rs. {product?.price}</div>
                        {/* <div className='flex  flex-col gap-[10px]'>
                            <div>SIZE</div>
                            <div className='text-[18px] flex gap-[10px]'>
                                {size.map((item, index) => {
                                    return (
                                        <p key={index} onClick={() => setIndexSize(index)} className={indexSize === index ? 'p-[5px] px-[10px] border-black border-[1.5px] h-max cursor-pointer' : ' cursor-pointer p-[5px] px-[10px] border-[1.5px] h-max'} > {item}</p>
                                    )
                                })}
                            </div>
                        </div> */}
                        <div className='flex items-center gap-[10px] text-[18px]'>
                            <div className='text-[20px]'><CiGlobe /></div>
                            <div>Free worldwide shipping</div>
                        </div>
                        {product?.stock < 10 &&
                            <div className='flex items-center gap-[15px] '>
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f4af29] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f4af29]"></span>
                                </span>
                                <div>Low stock - {product?.stock} items left</div>
                            </div>
                        }
                        <ButtonWhite isLoading={addingItemToCart} onClick={() => handleAddToCart(product?._id, 1, product?.mainCategory)} text="ADD TO CART" />
                        <LargeButton isLoading={buyNowLoading} onClick={() => { handleAddToCart(product?._id, 1, product?.mainCategory, true); setBuyNowLoading(true) }} text="BUY IT NOW" />
                        <div>{capitalizeFirstLetter(product?.description)}</div>
                    </div>
                </div>
            }
            {productsMayLike?.length !== 0 && !isLoading &&
                <div>
                    <div className='text-center text-[20px] uppercase font-bodyFont'>You may also like</div>
                    <div className='flex w-[95%] gap-[15px] flex-wrap mx-auto py-[20px]'>
                        {productsMayLike?.map((item, index) => {
                            return (
                                <SingleProduct key={index} index={index} data={item} />
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDesc