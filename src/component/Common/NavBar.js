import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Categories } from './Data/Categories'

const NavBar = () => {
    const navList = ['Home', 'Shop', 'Blog', 'Theme Features']
    return (
        <div className='max-[980px]:hidden'>
            <div className='w-[94%] mx-auto p-[10px] relative'>
                <div className='flex items-center justify-center gap-[20px]'>
                    {navList.map((item, index) => (
                        item === 'Shop'
                            ?
                            <div key={index} className='group'>
                                <Link>
                                    <div className='flex items-center'>
                                        <p className='font-bodyFont text-largeScreenContent max-[430px]:text-smallScreenContent'>{item}</p><MdKeyboardArrowDown />
                                    </div>
                                </Link>
                                <div className="hidden group-hover:flex absolute bg-white z-[1] shadow-md w-[70%] left-[15%] p-[3%]">
                                    <div className='flex justify-between items-center w-full'>
                                        {Categories.map((obj, idx) => {
                                            return (
                                                <div key={idx} className='flex flex-col gap-[5px]'>
                                                    <Link><h1 className='font-buttonFont font-bold'>{obj.title}</h1></Link>
                                                    <div className=''>
                                                        {obj.list.map((subObj, subIdx) => (
                                                            <Link key={subIdx}><p className='font-bodyFont text-largeScreenContent'>{subObj}</p></Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            : <Link key={index}><p className='font-bodyFont text-largeScreenContent max-[430px]:text-smallScreenContent' >{item}</p></Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NavBar