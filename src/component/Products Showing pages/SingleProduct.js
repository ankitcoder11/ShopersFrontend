import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from '../contextApi/MyContext';
import { CiEdit } from 'react-icons/ci';
import { HiOutlineEye } from "react-icons/hi2";

const SingleProduct = ({ data, index }) => {
    const { isAdmin } = useContext(MyContext);
    return (
        <>
            {!isAdmin ?
                <div className='relative cursor-pointer w-[23.5%] max-[550px]:w-[47%] max-[750px]:w-[31%] max-[850px]:w-[23%] min-[1185px]:w-[24%] h-[420px] max-[500px]:h-[400px] font-buttonFont items-center flex flex-col  hover:scale-105 transition-all duration-500' key={index}>
                    <div className='h-[280px] max-[500px]:h-[220px] min-h-[280px] max-[500px]:min-h-[220px] w-full'>
                        <Link to={`/products/${data?.mainCategory}/${data?.category}/${data._id}`}>
                            <img className='w-full h-full object-contain' src={data?.imageUrl[0]} alt={data?.name} />
                        </Link>
                    </div>
                    <Link to={`/products/${data?.mainCategory}/${data?.category}/${data._id}`}>
                        <p className='capitalize text-center max-[500px]:text-[14px] leading-[21px] '>{data?.name?.length > 120 ? `${data.name.slice(0, 115)}...` : data?.name}</p>
                    </Link>
                    <p>Rs. {data?.price}</p>
                    {data?.stock === 0 && <div className='absolute right-0 bg-white px-[5px] text-[14px] text-red-600'>Sold Out</div>}
                </div>
                :
                <div className='relative w-[23.5%] max-[550px]:w-[47%] max-[750px]:w-[31%] max-[850px]:w-[23%] min-[1185px]:w-[24%] h-[420px] max-[500px]:h-[400px] group font-buttonFont items-center flex flex-col hover:scale-105 transition-all duration-500' key={index}>
                    <div className='absolute flex items-center justify-center gap-[20px] w-full h-full z-10 group-hover:bg-black group-hover:bg-opacity-40 transition-all duration-500'>
                        <Link to={`/admin/products/${data?.mainCategory}/${data?.category}/${data._id}`}>
                            <div className='cursor-pointer text-white bg-black p-[10px] rounded-full text-[22px] hidden group-hover:flex'><CiEdit /></div>
                        </Link>
                        <Link to={`/products/${data?.mainCategory}/${data?.category}/${data._id}`}>
                            <div className='cursor-pointer text-white bg-black p-[10px] rounded-full text-[22px] hidden group-hover:flex'><HiOutlineEye /></div>
                        </Link>
                    </div>
                    <div className='h-[280px] max-[500px]:h-[220px] min-h-[280px] max-[500px]:min-h-[220px]'>
                        <img className='w-full h-full object-contain' src={data?.imageUrl[0]} alt={data?.name} />
                    </div>
                    <p className='capitalize text-center max-[500px]:text-[14px] leading-[21px]'>{data?.name?.length > 120 ? `${data.name.slice(0, 120)}...` : data?.name}</p>
                    <p>Rs. {data?.price}</p>
                    {data?.stock === 0 && <div className='absolute right-0 bg-white px-[5px] text-[14px] text-red-600'>Sold Out</div>}
                </div>
            }
        </>
    )
}

export default SingleProduct