import React, { useContext, useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { MyContext } from '../contextApi/MyContext';
import { removeFromCart, updateQuantityOfProduct } from '../../api/cart';
import toast from 'react-hot-toast';
import QuantitySelector from '../../utiles/QuantitySelector';
import { MdDelete } from 'react-icons/md';
import ButtonLoader from '../../utiles/ButtonLoader';
import Loader from '../../utiles/Loader';
import Modal from './../../utiles/Modal';
import LargeButton from '../../utiles/LargeButton';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const CartSideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        isSidebarOpen,
        setIsSidebarOpen,
        user,
        //cart
        fetchCartItems,
        fetchCartLoading,
        cartItems
    } = useContext(MyContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const [removeItemLoading, setRemoveItemLoading] = useState({ value: false, index: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToUpdateQuantity, setproductToUpdateQuantity] = useState();
    const [quantity, setQuantity] = useState(1);
    const [quantityUpdateLoading, setQuantityUpdateLoading] = useState(false)

    const closeSidebar = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsSidebarOpen(false);
            setIsAnimating(false);
        }, 500);
    };

    useEffect(() => {
        if (isSidebarOpen) {
            // Calculate the scrollbar width
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.paddingRight = '0px';
            document.body.style.overflow = '';
        }

        return () => {
            // Reset padding and overflow when the component unmounts
            document.body.style.paddingRight = '0px';
            document.body.style.overflow = '';
        };
    }, [isSidebarOpen]);

    const removeCartItems = async (...item) => {
        setRemoveItemLoading(
            { value: true, index: item[2] }
        )
        const data = {
            productModel: item[0].productModel,
            productId: item[0].productId._id,
            userId: item[1]._id,
        }
        try {
            const response = await removeFromCart(data);
            fetchCartItems();
            toast.success(response?.message)
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong")
        } finally {
            setRemoveItemLoading(
                { value: false, index: 0 }
            )
        }
    };
    useEffect(() => {
        if (user) {
            fetchCartItems();
        }
    }, [])
    useEffect(() => {
        closeSidebar();
    }, [location.pathname])

    const quantityOfProduct = async (item) => {
        setQuantityUpdateLoading(true);
        const userId = user;
        const productId = item.productId._id;
        const productModel = item.productModel;
        try {
            const data = { userId, productId, quantity, productModel };
            const response = await updateQuantityOfProduct(data);
            toast.success(response?.message);
            setIsModalOpen(false);
            fetchCartItems();
        } catch (err) {
            toast.error("Error while updating quantity")
        } finally {
            setQuantityUpdateLoading(false)
        }
    };
    const totalValue = cartItems?.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
    }, 0);

    return (
        <>
            {isSidebarOpen && (
                <div className="fixed w-full h-full bg-black z-20 bg-opacity-50 overflow-hidden font-bodyFont">
                    <div className={`overflow-auto w-[30%] min-w-[300px] h-full bg-white right-0 fixed ${isAnimating ? 'animate-sideBarClose' : 'animate-sideBarOpen'}`}>
                        <div className='flex flex-col gap-[20px] p-[15px]'>
                            <div className='flex items-center justify-between'>
                                <div onClick={closeSidebar} className='cursor-pointer'><RxCross1 /></div>
                                <div className='font-bold text-[20px] '>Cart</div>
                                <div>{cartItems?.length ? cartItems?.length : '0'} Item(s)</div>
                            </div>
                            <div className='w-full h-full'>
                                {
                                    fetchCartLoading ? <Loader /> :
                                        cartItems?.length === 0 || !cartItems
                                            ? (user
                                                ? <div className='text-center pt-[100px]'>Your cart is Empty</div>
                                                : <LargeButton
                                                    onClick={() => { navigate('/login'); closeSidebar() }}
                                                    text="Login"
                                                    className={"bg-black text-white"}
                                                />)
                                            : <div>
                                                <div className='overflow-auto h-[calc(100vh-180px)] themeScroll'>
                                                    {
                                                        cartItems?.map((item, index) => {
                                                            return (
                                                                <div key={index} className='flex justify-between py-[10px] border-t font-bodyFont overflow-hidden'>
                                                                    <div className='w-[27%] h-[150px]'>
                                                                        <Link to={`/products/${item?.productId?.mainCategory}/${item?.productId?.category}/${item?.productId?._id}`}>
                                                                            <img className='w-full h-full object-cover' src={item?.productId?.imageUrl[0]} />
                                                                        </Link>
                                                                    </div>
                                                                    <div className='w-[48%] flex justify-between flex-col'>
                                                                        <Link to={`/products/${item?.productId?.mainCategory}/${item?.productId?.category}/${item?.productId?._id}`}>
                                                                            <div className='capitalize text-[14px]'>{item?.productId?.name?.length > 40 ? item?.productId?.name?.slice(0, 35) + '...' : item?.productId?.name}</div>
                                                                        </Link>
                                                                        <div>Quantity : {item?.quantity}</div>
                                                                        <LargeButton
                                                                            onClick={() => { setIsModalOpen(true); setproductToUpdateQuantity(item); }}
                                                                            text="Update Quantity"
                                                                            className={"bg-black text-white w-max"}
                                                                        />
                                                                    </div>
                                                                    <div className='w-[17%] flex justify-between items-end flex-col'>
                                                                        <div className='text-[20px] text-red-500 cursor-pointer' onClick={() => removeCartItems(item, user, index)}>{removeItemLoading.index === index ? (removeItemLoading.value ? <ButtonLoader /> : <MdDelete />) : <MdDelete />}</div>
                                                                        <div>₹ {item?.productId?.price}</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className='border-t pt-[10px] flex justify-between items-center'>
                                                    <div>Total</div>
                                                    <div className=''>₹ {totalValue}</div>
                                                </div>
                                                <div className='pt-[10px] flex gap-[20px]'>
                                                    <LargeButton
                                                        onClick={() => { navigate('/protected/cart'); closeSidebar(); }}
                                                        text="View Cart"
                                                        className={"bg-[#ededed] w-max border-none"}
                                                    />
                                                    <LargeButton
                                                        onClick={() => { navigate('/protected/checkout') }}
                                                        text="Check Out"
                                                        className={"bg-black text-white w-max border-none"}
                                                    />
                                                </div>
                                            </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} heading={'Update Quantity'} width={'380px'}>
                <div className='flex justify-between py-[10px] border-t font-bodyFont'>
                    <div className='w-[28%] h-[150px]'>
                        <img className='w-full h-full object-cover' src={productToUpdateQuantity?.productId?.imageUrl[0]} />
                    </div>
                    <div className='w-[50%] flex justify-between flex-col'>
                        <div className='capitalize text-[14px]'>{productToUpdateQuantity?.productId?.name?.length > 40 ? productToUpdateQuantity?.productId?.name?.slice(0, 35) + '...' : productToUpdateQuantity?.productId?.name}</div>
                        <div>Quantity : {productToUpdateQuantity?.quantity}</div>
                        <div><QuantitySelector initialQuantity={productToUpdateQuantity?.quantity} onChange={setQuantity} /></div>
                    </div>
                    <div className='w-[15%] flex justify-between items-end flex-col'>
                        <div>$ {productToUpdateQuantity?.productId?.price}</div>
                    </div>
                </div>
                <LargeButton
                    isLoading={quantityUpdateLoading}
                    onClick={() => quantityOfProduct(productToUpdateQuantity)}
                    text="Update"
                    className={"bg-black text-white w-max"}
                />
            </Modal>
        </>
    );
};

export default CartSideBar;