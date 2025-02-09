import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Categories } from './Data/Categories';

const NavBar = () => {
    const navList = ['Home', 'Shop', 'Blog'];

    return (
        <div className='max-[980px]:hidden z-[2]'>
            <div className='w-[94%] mx-auto p-[10px] relative'>
                <div className='flex items-center justify-center gap-[20px]'>
                    {navList.map((item, index) => (
                        item === 'Shop' ? (
                            <div key={index} className='group'>
                                <div className='flex items-center cursor-pointer relative'>
                                    <p className='font-bodyFont text-largeScreenContent max-[430px]:text-smallScreenContent nav-item z-10'>{item}</p>
                                    <div className='nav-item z-10'><MdKeyboardArrowDown /></div>
                                </div>
                                <div className="hidden group-hover:flex absolute bg-white z-[1] shadow-md w-[70%] left-[15%] p-[3%]">
                                    <div className='flex justify-between items-center w-full'>
                                        {Categories.map((category, idx) => (
                                            <div key={idx} className='flex flex-col gap-[5px]'>
                                                <Link to={category.main.path}>
                                                    <h1 className='font-buttonFont font-bold'>{category.main.title}</h1>
                                                </Link>
                                                <div className=''>
                                                    {category.list.map((subCategory, subIdx) => (
                                                        <Link
                                                            key={subIdx}
                                                            to={subCategory.path}
                                                        >
                                                            <p className='font-bodyFont text-largeScreenContent'>{subCategory.title}</p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link key={index} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className='relative'>
                                <p className='font-bodyFont text-largeScreenContent max-[430px]:text-smallScreenContent nav-item'>{item}</p>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavBar;