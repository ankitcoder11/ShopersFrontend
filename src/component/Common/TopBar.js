import React, { useEffect, useState } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CiUser } from 'react-icons/ci';
import { IoMdArrowDropup } from 'react-icons/io';
import LargeButton from '../../utiles/LargeButton';

const TopBar = () => {
  const navigate = useNavigate();
  const [val, setVal] = useState(0);
  const [user, setUser] = useState({});
  const adv = ["free international shipping", "extended warranty available"]
  const token = Cookies.get('accessToken');
  useEffect(() => {
    if (token) {
      const userDetailes = JSON.parse(localStorage.getItem('user'))
      setUser(userDetailes)
    }
  }, [token])
  const handleLogout = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('user')
    navigate('/');
    window.location.reload();
  };
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
        <div className='max-[980px]:hidden font-bodyFont text-[14px] flex justify-end items-center'>
          {token
            ?
            <div className='relative p-[5px] bg-white rounded-full cursor-pointer group'>
              <div className='text-[20px] text-black'><CiUser /></div>
              <div className='absolute text-[20px] hidden group-hover:flex'><IoMdArrowDropup /></div>
              <div className='absolute z-50 text-black w-[400px] bg-white rounded-md right-[-10px] top-[37px] p-[10px] hidden group-hover:flex items-center flex-col gap-[10px] shadow-xl'>
                <div>Hello {user?.fullName}</div>
                <div className='flex gap-[10px] items-center justify-center w-full'>
                  <LargeButton
                    onClick={() => { handleLogout() }}
                    text="Logout"
                    className={"bg-black text-white"}
                  />
                  {user?.email === 'ankit@gmail.com' &&
                    <LargeButton
                      onClick={() => { navigate('/admin/dashboard') }}
                      text="Admin"
                      className={"bg-black text-white"}
                    />
                  }
                </div>
                <LargeButton
                  onClick={() => { navigate('/protected/orders') }}
                  text="Orders"
                  className={"bg-black text-white"}
                />
              </div>
            </div>
            :
            <Link to="/login" className='hover:scale-105 transition ease-linear duration-500 w-min cursor-pointer hover:bg-white hover:text-black px-[8px] p-[5px]'>Login</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default TopBar