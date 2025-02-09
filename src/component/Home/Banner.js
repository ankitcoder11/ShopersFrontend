import React from 'react'
import { useNavigate } from 'react-router-dom'
import LargeButton from '../../utiles/LargeButton';

const Banner = ({ heading, para, button, url, link }) => {
    const navigate = useNavigate();
    return (
        <div className='w-full h-[500px] text-white font-bodyFont flex justify-center items-center flex-col  gap-[10px] bg-cover bg-no-repeat' style={{ backgroundImage: `url(${url})` }}>
            <h2 className='text-[26px] font-medium font-buttonFont text-center'>{heading}</h2>
            <p className='text-[14px] text-center'>{para}</p>
            {button && <LargeButton className='border-none' text={button} onClick={() => navigate(link)} />}
        </div>
    )
}

export default Banner