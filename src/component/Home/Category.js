import React from 'react'
import { useNavigate } from 'react-router-dom'
import LargeButton from '../../utiles/LargeButton';

const Category = ({ url, category, para, button, link }) => {
    const navigate = useNavigate();
    return (
        <div className='w-[46%] max-[500px]:w-full h-[52vh] font-bodyFont text-white bg-cover text-[14px] max-[500px]:text-[12px] flex items-center flex-col justify-center gap-[8px] bg-no-repeat bg-opacity-30 bg-blend-overlay bg-black'
            style={{ backgroundImage: `url(${url})` }}>
            <div><h1 className='text-[30px] max-[500px]:text-[25px] uppercase font-semibold font-buttonFont opacity-90'>{category}</h1></div>
            <div><p className='opacity-90'>{para}</p></div>
            <LargeButton className='border-none' text={`Shop ${button}`} onClick={() => navigate(link)} />
        </div>
    )
}

export default Category