import React from 'react'

const Category = ({ url, category, para, button }) => {
    return (
        <div className='w-[46%] max-[500px]:w-full h-[52vh] font-bodyFont text-white bg-cover text-[14px] max-[500px]:text-[12px] flex items-center flex-col justify-center gap-[8px] bg-no-repeat bg-opacity-30 bg-blend-overlay bg-black'
            style={{ backgroundImage: `url(${url})` }}>
            <div><h1 className='text-[30px] max-[500px]:text-[25px] uppercase font-semibold font-buttonFont opacity-90'>{category}</h1></div>
            <div><p className='opacity-90'>{para}</p></div>
            <div><button className='bg-[#2b2b2b] p-[12px] max-[500px]:p-[10px] px-[18px] max-[500px]:px-[16px] uppercase font-medium font-buttonFont hover:bg-black hover:text-white transition duration-300 ease-linear'>Shop {button}</button></div>
        </div>
    )
}

export default Category