import React, { useContext, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavBarMenu from '../PopUps/NavBarMenu';
import { MyContext } from '../contextApi/MyContext';

const Header = () => {
    const [toSearch, setToSearch] = useState('');
    const { navBarMenu, setNavBarMenu, setIsSidebarOpen, isSidebarOpen, cartSize } = useContext(MyContext);
    return (
        <div className='grid grid-cols-4 w-[94%] mx-auto items-center'>
            <div className='max-[980px]:hidden border flex items-center p-[10px] rounded-[5px] gap-[10px] justify-between'>
                <div className='w-full'>
                    <input className='w-full outline-none font-bodyFont text-largeScreenContent max-[430px]:text-smallScreenContent' type='text' placeholder='Search' onChange={(e) => { setToSearch(e.target.value) }} value={toSearch} />
                </div>
                <div className='cursor-pointer'>
                    <FaSearch />
                </div>
            </div>
            <div className='min-[981px]:hidden' onClick={() => setNavBarMenu(true)}>
                <IoMenu />
            </div>
            {navBarMenu && <NavBarMenu />}
            <div className='col-span-2 flex justify-center'>
                <Link to='/'><p className='font-logoFont text-largeScreenlogoContent max-[980px]:text-smallScreenlogoContent tracking-[2px]'>ShoppersAdda</p></Link>
            </div>
            <div className='flex justify-end items-center'>
                <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='font-bodyFont text-largeScreenContent flex justify-end items-center gap-[5px] max-[430px]:gap-[2px] cursor-pointer'>
                    <div className='max-[430px]:hidden'><p>Cart</p></div>
                    <div className='text-[20px]'><MdOutlineShoppingCart /></div>
                    <div>{cartSize}</div>
                </div>
            </div>
        </div>
    )
}

export default Header