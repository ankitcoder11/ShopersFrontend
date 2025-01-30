import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../contextApi/MyContext'
import { getUserOrders } from '../../api/order';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../utiles/Loader';
import LargeButton from '../../utiles/LargeButton';

const Orders = () => {
    const { user } = useContext(MyContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        setLoading(true)
        try {
            const response = await getUserOrders(user?._id);
            setOrders(response.data)
            console.log(response.data)
        } catch (err) {
            // console.error(err)
            // toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getOrders();
    }, [])

    console.log(orders)
    return (
        <div className='w-[90%] mx-auto font-bodyFont flex flex-col gap-[20px] py-[10px] '>
            {orders.length !== 0 && <div className='text-[24px] font-semibold'>Your Orders</div>}
            {loading ? <Loader /> : orders?.length === 0
                ? <div className='h-[60vh] flex items-center justify-center flex-col gap-[10px] '>
                    Welcome! Once you place your first order, it will appear here.
                    <LargeButton
                        onClick={() => { navigate('/') }}
                        text="Start Shopping"
                        className={"bg-black text-white w-max"}
                    />
                </div>
                : <>{orders?.map((order, index) => {
                    return (
                        <div className='border rounded-[8px]' key={index}>
                            <div className='text-[#565959] text-[14px] flex justify-between items-center py-[18px] px-[14px] bg-[#f0f2f2] '>
                                <div className='flex gap-[30px]'>
                                    <div>
                                        <div className='text-[12px]'>ORDER PLACED</div>
                                        <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div>
                                        <div className='text-[12px]'>TOTAL</div>
                                        <div>₹ {order.totalAmount}.00</div>
                                    </div>
                                    <div>
                                        <div className='text-[12px]'>SHIP TO</div>
                                        <div>{order.address.fullName}</div>
                                    </div>
                                    <div>
                                        <div className='text-[12px]'>PAYMENT STATUS</div>
                                        <div>{order?.paymentStatus}</div>
                                    </div>
                                </div>
                                <div>
                                    ORDER # {order._id}
                                </div>
                            </div>
                            <div className='py-[18px] px-[14px] flex flex-col gap-[10px] '>
                                <div className='text-[18px]'>{order?.orderStatus}</div>
                                {order.items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='flex gap-[10px]'>
                                                <Link to={`/products/${item?.productId?.mainCategory}/${item?.productId?.category}/${item?.productId?._id}`} className='h-[90px] w-[90px]'>
                                                    <img src={item.productId.imageUrl[0]} className='w-full h-full object-contain' />
                                                </Link>
                                                <Link className='text-[#2162a1] hover:underline h-max' to={`/products/${item?.productId?.mainCategory}/${item?.productId?.category}/${item?.productId?._id}`}>
                                                    {item?.productId?.name?.length > 60 ? item?.productId?.name?.slice(0, 55) + '...' : item?.productId?.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}</>
            }
            <div>
            </div>
        </div>
    )
}

export default Orders