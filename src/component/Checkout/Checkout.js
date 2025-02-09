import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import LargeButton from '../../utiles/LargeButton'
import { MyContext } from '../contextApi/MyContext';
import { createOrder, verifyPayment } from '../../api/order';
import toast from 'react-hot-toast';
import { clearCart } from '../../api/cart';
import { addAddress, fetchAddress } from '../../api/address';
import Modal from '../../utiles/Modal';
import Loader from '../../utiles/Loader';

const formikSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
    phone: Yup.string()
        .required('Phone number is required.')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    fullName: Yup.string()
        .required('Name is required.'),
    street: Yup.string()
        .required('Address is required.'),
    city: Yup.string()
        .required('City is required.'),
    state: Yup.string()
        .required('State is required.'),
    zipCode: Yup.string()
        .required('Zip code is required.')
        .matches(/^[0-9]{6}$/, 'Zip code must be 6 digits'),
});

const states = [
    { "name": "Andhra Pradesh", "code": "AP" },
    { "name": "Arunachal Pradesh", "code": "AR" },
    { "name": "Assam", "code": "AS" },
    { "name": "Bihar", "code": "BR" },
    { "name": "Chhattisgarh", "code": "CG" },
    { "name": "Goa", "code": "GA" },
    { "name": "Gujarat", "code": "GJ" },
    { "name": "Haryana", "code": "HR" },
    { "name": "Himachal Pradesh", "code": "HP" },
    { "name": "Jharkhand", "code": "JH" },
    { "name": "Karnataka", "code": "KA" },
    { "name": "Kerala", "code": "KL" },
    { "name": "Madhya Pradesh", "code": "MP" },
    { "name": "Maharashtra", "code": "MH" },
    { "name": "Manipur", "code": "MN" },
    { "name": "Meghalaya", "code": "ML" },
    { "name": "Mizoram", "code": "MZ" },
    { "name": "Nagaland", "code": "NL" },
    { "name": "Odisha", "code": "OD" },
    { "name": "Punjab", "code": "PB" },
    { "name": "Rajasthan", "code": "RJ" },
    { "name": "Sikkim", "code": "SK" },
    { "name": "Tamil Nadu", "code": "TN" },
    { "name": "Telangana", "code": "TS" },
    { "name": "Tripura", "code": "TR" },
    { "name": "Uttar Pradesh", "code": "UP" },
    { "name": "Uttarakhand", "code": "UK" },
    { "name": "West Bengal", "code": "WB" }
]

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, user, setCartItems, setCartSize } = useContext(MyContext)
    const [buyNowLoading, setBuyNowLoading] = useState(false);
    const [addressList, setAddressList] = useState();
    const [addressListLoading, setAddressListLoading] = useState(false)
    const [addAddressListLoading, setAddAddressListLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [defaultAddressTemp, setDefaultAddressTemp] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const isSingleProductCheckout = new URLSearchParams(location.search).get('single') === 'true';
    const productId = queryParams.get('productId');
    const product = cartItems?.filter((item) => item.productId._id === productId) || [];
    const checkoutItems = isSingleProductCheckout ? product : cartItems;

    useEffect(() => {
        if (cartItems?.length === 0) { navigate('/protected/cart') }
    }, [])

    const handleBuyNow = async () => {
        if (user) {
            setBuyNowLoading(true);
            const totalAmount = checkoutItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
            const orderData = {
                userId: user,
                items: checkoutItems.map(item => ({
                    productId: item.productId._id,
                    quantity: isSingleProductCheckout ? 1 : item.quantity,
                    price: item.productId.price,
                    productModel: item.productModel
                })),
                price: isSingleProductCheckout ? checkoutItems[0]?.productId.price + 120 : totalAmount + 120,
                address: {
                    userId: user,
                    fullName: defaultAddress.fullName,
                    phone: defaultAddress.phone,
                    email: defaultAddress.email,
                    street: defaultAddress.street,
                    city: defaultAddress.city,
                    state: defaultAddress.state,
                    zipCode: defaultAddress.zipCode,
                }
            };
            try {
                const response = await createOrder(orderData);

                if (response.success) {
                    const { orderId, razorpayOrderId, amount } = response.data;

                    // Step 2: Initiate Razorpay payment
                    const options = {
                        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                        amount: amount.toString(), // total amount for all products
                        currency: 'INR',
                        name: 'My Store',
                        description: 'Purchase Products',
                        order_id: razorpayOrderId,
                        handler: async (paymentResponse) => {
                            // Step 3: Verify payment
                            const verification = await verifyPayment({ ...paymentResponse, orderId });

                            if (verification.success) {
                                toast.success('Order placed successfully!');
                                try {
                                    if (!isSingleProductCheckout) {
                                        const response = await clearCart({ userId: user._id });
                                        setCartItems([])
                                        setCartSize(0)
                                    }
                                    navigate('/')
                                } catch (error) {
                                    console.error('Error clearing cart:', error);
                                    toast.error('Failed to clear the cart.');
                                }
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
                setBuyNowLoading(false);
            }
        } else {
            toast.error('Please log in to proceed.');
        }
    };

    const addAddressData = async (values) => {
        setAddAddressListLoading(true);
        const data = {
            userId: user._id,
            email: values.email,
            fullName: values.fullName,
            phone: values.phone,
            street: values.street,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
            isDefault: values.isDefault
        }
        try {
            const response = await addAddress(data);
            toast.success(response.message)
            setIsModalOpen(false)
            setDefaultAddress(values)
            formikForm.resetForm()
        } catch (error) {
            console.error(error)
        } finally {
            setAddAddressListLoading(false);
        }
    };

    const formikForm = useFormik({
        initialValues: {
            email: '',
            phone: '',
            fullName: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            isDefault: false
        },
        validationSchema: formikSchema,
        onSubmit: (values) => { addAddressData(values) },
    })

    const totalValue = checkoutItems?.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
    }, 0);

    const fetchAddressList = async () => {
        setAddressListLoading(true);
        try {
            const response = await fetchAddress(user._id);
            setAddressList(response?.data)
        } catch (error) {
            console.error(error)
        } finally {
            setAddressListLoading(false);
        }
    };

    useEffect(() => {
        fetchAddressList()
    }, [])

    useEffect(() => {
        const defaultAddr = addressList?.find(address => address.isDefault === true);
        setDefaultAddress(defaultAddr);
        setDefaultAddressTemp(defaultAddr);
    }, [addressList]);
    return (
        <>
            <div className='p-[10px] border-b'>
                <div className='flex justify-between items-center w-[90%] mx-auto'>
                    <Link to='/'><p className='font-logoFont text-[30px] max-[980px]:text-smallScreenlogoContent tracking-[2px]'>ShoppersAdda</p></Link>
                    <Link to='/protected/cart' className='text-[20px] text-blue-500'><MdOutlineShoppingCart /></Link>
                </div>
            </div>
            <div className='w-[90%] mx-auto font-bodyFont flex max-[700px]:flex-col max-[700px]:gap-[10px] justify-between'>
                <div className='flex flex-col gap-[10px] w-[45%] max-[700px]:w-full pt-[15px] justify-between'>
                    <div className='flex justify-between'>
                        <div className='font-semibold'>Delivery address</div>
                        {addressListLoading ? <Loader /> :
                            defaultAddress && <div className='text-[14px]'>
                                <p>{defaultAddress?.fullName}</p>
                                <p>{defaultAddress?.street}</p>
                                <p>{defaultAddress?.city}</p>
                                <p>{defaultAddress?.state}</p>
                                <p>{defaultAddress?.zipCode}</p>
                                <p>{defaultAddress?.phone}</p>
                            </div>
                        }
                        {defaultAddress ?
                            <div className='hover:underline h-max text-blue-600 cursor-pointer' onClick={() => setIsAddressModalOpen(true)}>Change</div>
                            : <div className='hover:underline h-max text-blue-600 cursor-pointer' onClick={() => setIsModalOpen(true)}>Add address</div>
                        }
                    </div>
                    <LargeButton onClick={() => { if (defaultAddress) { handleBuyNow() } }} text="Place Order" isLoading={buyNowLoading} />
                </div>
                <div className='border'></div>
                <div className='w-[45%] max-[700px]:w-full flex flex-col gap-[10px] h-[calc(100vh-100px)] max-[700px]:h-full p-[15px] overflow-auto '>
                    {checkoutItems?.map((item, index) => {
                        return (
                            <div key={index} className='flex justify-between items-center'>
                                <div className='w-[80px] h-[100px] border rounded relative'>
                                    <img className='w-full h-full object-cover rounded' src={item?.productId?.imageUrl[0]} />
                                    <p className='absolute top-[-5px] right-[-5px] text-center text-[13px] w-[18px] h-[18px] text-white bg-black bg-opacity-70 rounded-full'>{isSingleProductCheckout ? 1 : item?.quantity}</p>
                                </div>
                                <div className='capitalize text-[14px]'>
                                    {item?.productId?.name?.length > 35 ? item?.productId?.name?.slice(0, 25) + '...' : item?.productId?.name}
                                </div>
                                <div>₹ {isSingleProductCheckout ? item?.productId?.price : item?.productId?.price * item?.quantity}.00</div>
                            </div>
                        )
                    })
                    }
                    <div className='flex justify-between items-center'>
                        <div>Subtotal</div>
                        <div className=''>₹ {isSingleProductCheckout ? checkoutItems[0]?.productId.price : totalValue}.00</div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div>Shipping</div>
                        <div className=''>₹ 120.00</div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='text-[20px] font-semibold'>Total</div>
                        <div className='text-[20px] font-semibold'><span className='font-normal font-buttonFont text-[14px] text-gray-500'>INR</span> ₹ {isSingleProductCheckout ? checkoutItems[0]?.productId.price + 120 : totalValue + 120}.00</div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} heading={'Add address'} width={'50vw'} height={'90%'}>
                <form className='font-bodyFont flex flex-col pt-[15px] gap-[20px]'>
                    <div className='flex flex-col gap-[12px] '>
                        <div className='text-[20px] font-medium'>Contact</div>
                        <div className='relative'>
                            <input type='email' placeholder='Email' name='email' value={formikForm?.values?.email} onChange={formikForm.handleChange}
                                className='outline-none border text-[14px] w-full p-[10px] rounded' />
                            {formikForm?.errors?.email && formikForm?.touched?.email && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {formikForm?.errors?.email}</p>}
                        </div>
                        <div className='relative'>
                            <input type='number' min={1} max={1999999} placeholder='Mobile Number' name='phone' value={formikForm?.values?.phone} onChange={formikForm.handleChange}
                                className='outline-none border text-[14px] w-full p-[10px] rounded' />
                            {formikForm?.errors?.phone && formikForm?.touched?.phone && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {formikForm?.errors?.phone}</p>}
                        </div>
                    </div>
                    <div className='flex flex-col gap-[12px] '>
                        <div className='text-[20px] font-medium'>Delivery</div>
                        <div className='relative'>
                            <input type='text' placeholder='Name' name='fullName' value={formikForm?.values?.fullName} onChange={formikForm.handleChange}
                                className='outline-none border text-[14px] w-full p-[10px] rounded' />
                            {formikForm?.errors?.fullName && formikForm?.touched?.fullName && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {formikForm?.errors?.fullName}</p>}
                        </div>
                        <div className='relative'>
                            <input type='text' placeholder='Address' name='street' value={formikForm?.values?.street} onChange={formikForm.handleChange}
                                className='outline-none border text-[14px] w-full p-[10px] rounded' />
                            {formikForm?.errors?.street && formikForm?.touched?.street && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {formikForm?.errors?.street}</p>}
                        </div>
                        <div className='flex gap-[10px]'>
                            <div className='relative'>
                                <input
                                    type='text' placeholder='City' name='city' value={formikForm?.values?.city} onChange={formikForm.handleChange} className='outline-none border text-[14px] w-full p-[10px] rounded' />
                                {formikForm?.errors?.city && formikForm?.touched?.city && <p className='absolute text-[10px] bottom-[-12px] text-red-400'>{formikForm?.errors?.city}</p>}
                            </div>
                            <div className='relative'>
                                <select name='state' value={formikForm?.values?.state} onChange={formikForm.handleChange} className='outline-none border text-[14px] w-full p-[12px] rounded'>
                                    <option value='' disabled>Select a State</option>
                                    {states.map(state => (
                                        <option key={state.code} value={state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                                {formikForm?.errors?.state && formikForm?.touched?.state && (<p className='absolute text-[10px] bottom-[-12px] text-red-400'>{formikForm?.errors?.state}</p>)}
                            </div>
                            <div className='relative'>
                                <input type='number' placeholder='Zip code' name='zipCode' value={formikForm?.values?.zipCode} onChange={formikForm.handleChange} className='outline-none border text-[14px] w-full p-[10px] rounded' />
                                {formikForm?.errors?.zipCode && formikForm?.touched?.zipCode && <p className='absolute text-[10px] bottom-[-12px] text-red-400'>{formikForm?.errors?.zipCode}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='relative flex items-center'>
                        <input type='checkbox' id='isDefault' name='isDefault' checked={formikForm?.values?.isDefault} onChange={formikForm.handleChange} className='outline-none border text-[14px] w-[18px] h-[18px] mr-[10px] accent-black' />
                        <label htmlFor='isDefault' className='text-[14px] cursor-pointer'>Set as default address</label>
                        {formikForm?.errors?.isDefault && formikForm?.touched?.isDefault && (<p className='absolute text-[10px] bottom-[-12px] text-red-400'>{formikForm?.errors?.isDefault}</p>)}
                    </div>
                    <LargeButton onClick={() => { formikForm.handleSubmit() }} text="Use this address" isLoading={addAddressListLoading} />
                </form>
            </Modal>
            <Modal isOpen={isAddressModalOpen} closeModal={() => setIsAddressModalOpen(false)} heading={'Your addresses'} width={'50vw'} height={'90%'}>
                <div className='pt-[10px] flex flex-col gap-[10px]'>
                    {addressList?.map(address => (
                        <div key={address._id}>
                            <label className='flex items-center gap-[10px]'>
                                <input type="radio" name="address" value={address._id} checked={defaultAddressTemp?._id === address._id} onChange={() => setDefaultAddressTemp(address)} />
                                <span className='font-semibold'>{address.fullName}</span> - {address.street}, {address.city}, {address.state}, {address.zipCode}
                            </label>
                        </div>
                    ))}
                    <div className='flex gap-[10px] '>
                        <LargeButton onClick={() => { setDefaultAddress(defaultAddressTemp); setIsAddressModalOpen(false) }} text="Use this address" />
                        <LargeButton onClick={() => { setIsModalOpen(true); setIsAddressModalOpen(false) }} text="Add a new address" />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Checkout