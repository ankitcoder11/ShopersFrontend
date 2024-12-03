import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from '../contextApi/MyContext';

const SingleProduct = ({ data, index }) => {
    const { isAdmin } = useContext(MyContext);
    return (
        <>
            {!isAdmin ?
                <div className='relative cursor-pointer min-w-[200px] max-w-[320px] w-[23%] h-[420px] font-buttonFont items-center flex flex-col  hover:scale-105 transition-all duration-500' key={index}>
                    <div className='h-[280px] min-h-[280px] w-full bg-gray-300'>
                        <Link to={`/products/${data?.mainCategory}/${data?.category}/${data._id}`}>
                            <img className='w-full h-full object-cover' src={data?.imageUrl[0]} alt={data?.name} />
                        </Link>
                    </div>
                    <Link to={`/products/${data?.mainCategory}/${data?.category}/${data._id}`}>
                        <p className='capitalize text-center'>{data?.name?.length > 120 ? `${data.name.slice(0, 120)}...` : data?.name}</p>
                    </Link>
                    <p>Rs. {data?.price}</p>
                    {data?.stock === 0 && <div className='absolute right-0 bg-white px-[5px] text-[14px] text-red-600'>Sold Out</div>}
                </div>
                :
                <div className='relative cursor-pointer min-w-[200px] max-w-[320px] w-[23%] h-[420px] font-buttonFont items-center flex flex-col  hover:scale-105 transition-all duration-500' key={index}>
                    <div className='h-[280px] min-h-[280px] w-full bg-gray-300'>
                        <Link to={`/admin/products/${data?.mainCategory}/${data?.category}/${data._id}`}>
                            <img className='w-full h-full object-cover' src={data?.imageUrl[0]} alt={data?.name} />
                        </Link>
                    </div>
                    <Link to={`/admin/products/${data?.mainCategory}/${data?.category}/${data._id}`}>
                        <p className='capitalize text-center'>{data?.name?.length > 120 ? `${data.name.slice(0, 120)}...` : data?.name}</p>
                    </Link>
                    <p>Rs. {data?.price}</p>
                    {data?.stock === 0 && <div className='absolute right-0 bg-white px-[5px] text-[14px] text-red-600'>Sold Out</div>}
                </div>
            }
        </>
    )
}

export default SingleProduct