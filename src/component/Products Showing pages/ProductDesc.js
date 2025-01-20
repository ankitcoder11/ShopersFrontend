import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { CiGlobe } from 'react-icons/ci';
import SingleProduct from './SingleProduct';
import { fetchProducts } from '../../api/products';
import Loader from '../../utiles/Loader';
import { addToCart } from '../../api/cart';
import { MyContext } from '../contextApi/MyContext';
import toast from 'react-hot-toast';
import ButtonLoader from '../../utiles/ButtonLoader';
import { createOrder, verifyPayment } from '../../api/order';
import LargeButton from '../../utiles/LargeButton';

const ProductDesc = () => {
    const location = useLocation()
    const [indexImage, setIndexImage] = useState(0);
    const [indexSize, setIndexSize] = useState(0);
    const [productsData, setProductsData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [addingItemToCart, setAddingItemToCart] = useState(false)
    const fullPath = location.pathname;
    const arr = fullPath.split("/")
    const category = arr[2]
    const productId = arr[4];
    const subCategory = arr[3];
    const [buyNowLoading, setBuyNowLoading] = useState(false);

    const { user } = useContext(MyContext);

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

    const size = ['XS', 'S', 'M', 'L', 'XL']

    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    // Add item to the cart
    const handleAddToCart = async (productId, quantity, mainCategory) => {
        if (user) {
            setAddingItemToCart(true)
            const userId = user;
            try {
                const data = { userId, productId, quantity, mainCategory };
                const response = await addToCart(data);
                toast.success(response?.message)
            } catch (err) {
                toast.error("Error while adding item to cart")
            } finally {
                setAddingItemToCart(false)
            }
        } else {
            toast.error("Please login first")
        }
    };

    const handleBuyNow = async () => {
        if (user) {
            setBuyNowLoading(true)
            const orderData = {
                userId: user,
                productId: product?._id,
                quantity: 1,
                price: product?.price,
            };

            try {
                // Step 1: Create order on the backend
                const response = await createOrder(orderData);
                if (response.success) {
                    const { orderId, razorpayOrderId, amount } = response.data;

                    // Step 2: Initiate Razorpay payment
                    const options = {
                        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                        amount: amount.toString(),
                        currency: 'INR',
                        name: 'My Store',
                        description: 'Purchase Product',
                        order_id: razorpayOrderId,
                        handler: async (paymentResponse) => {
                            // Step 3: Verify payment
                            const verification = await verifyPayment({ ...paymentResponse, orderId });

                            if (verification.success) {
                                toast.success('Order placed successfully!');
                            } else {
                                toast.error('Payment verification failed.');
                            }
                        },
                        prefill: {
                            name: user.name,
                            email: user.email,
                            contact: user.phone,
                        },
                        modal: {
                            ondismiss: () => {
                                toast.error('Payment was canceled.');
                            },
                        }
                    };
                    console.log('Razorpay Options:', options);
                    const razorpay = new window.Razorpay(options);
                    razorpay.open();
                } else {
                    toast.error('Failed to create order. Please try again.');
                }
            } catch (error) {
                toast.error('Error processing your order.');
                console.error(error);
            } finally {
                setBuyNowLoading(false)
            }
        } else {
            toast.error('Please log in to proceed.');
        }
    };


    return (
        <div>
            {isLoading ? <Loader /> :
                <div className='w-[95%] mx-auto py-[20px] flex justify-between font-bodyFont'>
                    <div className='w-[59%] flex justify-between'>
                        <div className='w-[15%]'>
                            {product?.imageUrl.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => setIndexImage(index)} className={index === indexImage ? 'w-full h-[120px] p-[5px] border-[1.5px] border-black ' : 'w-full h-[120px] cursor-pointer p-[5px] border-[1.5px] border-white'}>
                                        <img className='w-full h-full object-cover' src={item} alt='Some error while loading' />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='w-[80%] h-[800px]'>
                            <img className='w-full h-full object-cover' src={product?.imageUrl[indexImage]} alt='Some error while loading' />
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
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f4af29] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f4af29]"></span>
                                </span>
                                <div>Low stock - {product?.stock} items left</div>
                            </div>
                        }
                        <LargeButton
                            isLoading={addingItemToCart}
                            onClick={() => handleAddToCart(product?._id, 1, product?.mainCategory)}
                            text="ADD TO CART"
                        />
                        <LargeButton
                            isLoading={buyNowLoading}
                            onClick={() => handleBuyNow()}
                            text="BUY IT NOW"
                            className={"bg-black text-white"}
                        />
                        <div>{capitalizeFirstLetter(product?.description)}</div>
                    </div>
                </div>
            }
            {productsMayLike?.length !== 0 &&
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
            }
        </div>
    )
}

export default ProductDesc