import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdKeyboardArrowDown, MdOutlineShoppingCart } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { MyContext } from '../contextApi/MyContext'
import { Categories } from '../Common/Data/Categories'

const NavBarMenu = () => {
    const navList = ['Home', 'Shop', 'Blog', 'Theme Features']
    const [toSearch, setToSearch] = useState('');
    const { navBarMenu, setNavBarMenu } = useContext(MyContext);
    const [forClose, setForClose] = useState(true);
    const [shopItem, setShopItem] = useState(false);
    const [subShopItem, setSubShopItem] = useState([
        { value: false },
        { value: false },
        { value: false }
    ]);
    const subShopItemSetter = (id) => {
        let newArray = [...subShopItem];
        for (let i = 0; i < newArray.length; i++) {
            if (i === id) {
                newArray[id] = {
                    ...newArray[id],
                    value: !newArray[id].value
                }
            } else {
                newArray[i] = {
                    ...newArray[i],
                    value: false
                }
            }
        }
        setSubShopItem(newArray);
        // setSubShopItem(prev => {
        //     prev[id] = {
        //         ...prev[id],
        //         value: true
        //     }
        //     console.log(prev)
        //     return prev
        // })
    }

    return (
        <div className='fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0'>
            <div className={`w-[36%] min-w-[300px] h-screen text-white text-smallScreenContent bg-white flex flex-col gap-[15px] p-[10px] themeScroll ${forClose ? 'animate-navBarMenuOpen' : 'animate-navBarMenuClose'}`}>
                <div className='text-black text-[20px] p-[10px] flex justify-end' onClick={() => { setForClose(false); setTimeout(() => { setNavBarMenu(false); }, 500); }}><RxCross1 /></div>
                <div className='font-bodyFont border flex p-[10px] justify-between text-black cursor-pointer'>
                    <div className='flex gap-[5px]'>
                        <div><p className='uppercase'>Cart</p></div>
                        <div><p>0</p></div>
                    </div>
                    <div className='text-[20px]'><MdOutlineShoppingCart /></div>
                </div>
                <div className='flex flex-col justify-center text-black gap-[10px]'>
                    {navList.map((item, index) => (
                        item === 'Shop'
                            ?
                            <div key={index}>
                                <Link>
                                    <div className='flex items-center justify-between border-b p-[10px]'>
                                        <p className='font-bodyFont'>{item}</p><MdKeyboardArrowDown onClick={() => setShopItem(!shopItem)} className={`text-[20px] ${shopItem ? 'rotate-180 animate-arrowRotate' : 'animate-arrowRotateBack'}`} />
                                    </div>
                                </Link>
                                {shopItem &&
                                    <div className='p-[10px] pr-0 flex flex-col gap-[10px]'>
                                        {Categories.map((obj, idx) => {
                                            return (
                                                <div key={idx} className=''>
                                                    <div className='border-b p-[10px] flex items-center justify-between'>
                                                        <p>{obj.title}</p>
                                                        <MdKeyboardArrowDown onClick={() => subShopItemSetter(idx)} className={`text-[20px] ${subShopItem[idx].value ? 'rotate-180 animate-arrowRotate' : 'animate-arrowRotateBack'}`} />
                                                    </div>
                                                    {subShopItem[idx].value &&
                                                        <div className='p-[10px] flex flex-col gap-[10px]'>
                                                            {obj.list.map((subObj, subIdx) => (
                                                                <p className='border-b p-[10px]'>{subObj}</p>
                                                            ))}
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                }

                            </div>
                            : <Link><p className='font-bodyFont cursor-pointer p-[10px] border-b' key={index}>{item}</p></Link>
                    ))}
                </div>
                <div className='border flex items-center p-[10px] rounded-[5px] gap-[10px] justify-between'>
                    <div className='w-full'>
                        <input className='w-full outline-none font-bodyFont text-smallScreenContent text-black' type='text' placeholder='Search' onChange={(e) => { setToSearch(e.target.value) }} value={toSearch} />
                    </div>
                    <div className='cursor-pointer text-black'>
                        <FaSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBarMenu