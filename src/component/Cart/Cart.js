import React, { useContext, useState } from 'react'
import { MdDelete, MdKeyboardArrowLeft } from 'react-icons/md'
import { MyContext } from '../contextApi/MyContext'
import LargeButton from '../../utiles/LargeButton'
import ButtonLoader from '../../utiles/ButtonLoader'
import toast from 'react-hot-toast'
import { removeFromCart, updateQuantityOfProduct } from '../../api/cart'
import Modal from './../../utiles/Modal';
import QuantitySelector from '../../utiles/QuantitySelector'
import Loader from '../../utiles/Loader'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const navigate = useNavigate();
    const { user, cartItems, fetchCartItems, fetchCartLoading } = useContext(MyContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToUpdateQuantity, setproductToUpdateQuantity] = useState();
    const [removeItemLoading, setRemoveItemLoading] = useState({ value: false, index: 0 });
    const [quantity, setQuantity] = useState(1);
    const [quantityUpdateLoading, setQuantityUpdateLoading] = useState(false)

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
        <div className='w-[90%] mx-auto font-bodyFont'>
            <div className='border-b flex justify-between items-center py-[15px]'>
                <Link to={'/'}>
                    <div className='flex items-center gap-[10px] '>
                        <div className='text-[24px]'><MdKeyboardArrowLeft /></div>
                        <div>Continue Shopping</div>
                    </div>
                </Link>
                <div className='text-[24px] font-semibold'>Cart</div>
                <div>{cartItems?.length ? cartItems?.length : '0'} Item(s)</div>
            </div>

            <div>
                {
                    fetchCartLoading ? <Loader /> :
                        cartItems?.length === 0
                            ? (user
                                ? <div className='text-center p-[100px]'>Your cart is currently empty.</div>
                                : <LargeButton
                                    onClick={() => { navigate('/login'); }}
                                    text="Login"
                                    className={"bg-black text-white"}
                                />)
                            : <div>
                                {
                                    cartItems?.map((item, index) => {
                                        return (
                                            <div key={index} className='flex justify-between py-[10px] items-center border-t font-bodyFont overflow-hidden'>
                                                <div className='w-[27%] h-[250px]'>
                                                    <Link to={`/products/${item?.productId?.mainCategory}/${item?.productId?.category}/${item?.productId?._id}`}>
                                                        <img className='w-full h-full object-contain' src={item?.productId?.imageUrl[0]} />
                                                    </Link>
                                                </div>
                                                <div className='capitalize text-[14px] hover:underline hover:text-blue-500'>
                                                    <Link to={`/products/${item?.productId?.mainCategory}/${item?.productId?.category}/${item?.productId?._id}`}>
                                                        {item?.productId?.name?.length > 40 ? item?.productId?.name?.slice(0, 35) + '...' : item?.productId?.name}
                                                    </Link>
                                                </div>
                                                <div>₹ {item?.productId?.price}</div>
                                                <div className='flex items-center justify-center flex-col'>
                                                    <div>Quantity : {item?.quantity}</div>
                                                    <LargeButton
                                                        onClick={() => { setIsModalOpen(true); setproductToUpdateQuantity(item); }}
                                                        text="Update Quantity"
                                                        className={"bg-black text-white w-max"}
                                                    />
                                                </div>
                                                <div>₹ {item?.productId?.price * item?.quantity}</div>
                                                <div className='h-[250px] text-[20px] text-red-500 cursor-pointer' onClick={() => removeCartItems(item, user, index)}>
                                                    {removeItemLoading.index === index ? (removeItemLoading.value ? <ButtonLoader /> : <MdDelete />) : <MdDelete />}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                }
            </div>

            {cartItems?.length > 0 &&
                <div className='border-t py-[15px] flex flex-col items-end gap-[20px]'>
                    <div className='border-b p-[10px] flex justify-between items-center w-1/2'>
                        <div>Total</div>
                        <div className=''>₹ {totalValue}</div>
                    </div>
                    <LargeButton
                        onClick={() => { navigate('/protected/checkout')}}
                        text="Check Out"
                        className={"bg-black text-white w-max border-none"}
                    />
                </div>
            }

            <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} heading={'Update Quantity'}>
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
                        <div>₹ {productToUpdateQuantity?.productId?.price}</div>
                    </div>
                </div>
                <LargeButton
                    isLoading={quantityUpdateLoading}
                    onClick={() => quantityOfProduct(productToUpdateQuantity)}
                    text="Update"
                    className={"bg-black text-white w-max"}
                />
            </Modal>
        </div>

    )
}

export default Cart


{/* <div>
                {
                    cartItems?.map((item, index) => {
                        return (
                            <div key={index} className='flex justify-between py-[10px] items-center border-t font-bodyFont overflow-hidden'>
                                <div className='w-[27%] h-[250px]'>
                                    <img className='w-full h-full object-contain' src={item?.productId?.imageUrl[0]} />
                                </div>
                                <div className='capitalize text-[14px]'>{item?.productId?.name?.length > 40 ? item?.productId?.name?.slice(0, 35) + '...' : item?.productId?.name}</div>
                                <div>$ {item?.productId?.price}</div>
                                <div className='flex items-center justify-center flex-col'>
                                    <div>Quantity : {item?.quantity}</div>
                                    <LargeButton
                                        onClick={() => { setIsModalOpen(true); setproductToUpdateQuantity(item); }}
                                        text="Update Quantity"
                                        className={"bg-black text-white w-max"}
                                    />
                                </div>
                                <div>$ {item?.productId?.price * item?.quantity}</div>
                                <div className='h-[250px] text-[20px] text-red-500 cursor-pointer' onClick={() => removeCartItems(item, user, index)}>{removeItemLoading.index === index ? (removeItemLoading.value ? <ButtonLoader /> : <MdDelete />) : <MdDelete />}</div>
                            </div>
                        )
                    })
                }
            </div> */}