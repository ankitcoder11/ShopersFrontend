import React, { useState } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

const TopBar = () => {
  const [val, setVal] = useState(0);
  const adv = ["free international shipping", "extended warranty available"]
  return (
    <div className='w-full bg-topBarBg p-[5px]'>
      <div className='w-[94%] grid grid-cols-4 mx-auto p-[10px] text-white'>
        <div className='flex gap-[10px] max-[980px]:hidden opacity-90'>
          <div><FaFacebookF /></div>
          <div><FaXTwitter /></div>
          <div><FaInstagram /></div>
        </div>
        <div className=' col-span-2 max-[980px]:col-span-4 flex justify-between items-center opacity-90'>
          <div onClick={() => val > 0 ? setVal(val - 1) : setVal(1)} className='text-[25px] max-[430px]:text-[20px] cursor-pointer'><MdKeyboardArrowLeft /></div>
          <div>
            <p className='uppercase font-bodyFont text-largeScreenContent max-[430px]:text-smallScreenContent font-semibold opacity-90'>{adv[val]}</p>
          </div>
          <div onClick={() => val < 1 ? setVal(val + 1) : setVal(0)} className='text-[25px] max-[430px]:text-[20px] cursor-pointer'><MdKeyboardArrowRight /></div>
        </div>
        <div className='max-[980px]:hidden font-bodyFont text-[14px] flex justify-end'>
          <Link to="/login" className='hover:scale-105 transition ease-linear duration-150 w-min cursor-pointer hover:bg-white hover:text-black rounded-[5px] p-[5px]'>Login/Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default TopBar