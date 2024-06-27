import React from 'react'

const Banner = ({ heading, para, button, url }) => {
    return (
        <div className='w-full h-[500px] text-white font-bodyFont flex justify-center items-center flex-col  gap-[10px] bg-cover bg-no-repeat' style={{ backgroundImage: `url(${url})` }}>
            <h2 className='text-[26px] font-medium font-buttonFont'>{heading}</h2>
            <p className='text-[14px]'>{para}</p>
            {button &&<button className='bg-[#2b2b2b] p-[12px] max-[500px]:p-[10px] px-[18px] max-[500px]:px-[16px] uppercase font-medium font-buttonFont hover:bg-black hover:text-white transition duration-300 ease-linear'>{button}</button>}
        </div>
    )
}

export default Banner