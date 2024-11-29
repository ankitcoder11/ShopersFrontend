import React from 'react'

const SingleProduct = ({ data, key }) => {
    return (
        <div className='relative cursor-pointer min-w-[200px] hover:scale-105 transition-all duration-500 max-w-[320px] w-[23%] h-[350px] font-buttonFont items-center flex flex-col' key={key}>
            <div className='h-[280px] w-full bg-gray-300'>
                <img className='w-full h-full object-cover' src={data?.imageUrl[0]} alt={data?.name} />
            </div>
            <p className='capitalize text-center'>{data?.name}</p>
            <p>Rs. {data?.price}</p>
            {data?.stock === 0 && <div className='absolute right-0 bg-white px-[5px] text-[14px] text-red-600'>Sold Out</div>}
        </div>
    )
}

export default SingleProduct