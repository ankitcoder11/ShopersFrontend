import React, { useContext, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdKeyboardArrowDown, MdOutlineShoppingCart } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { MyContext } from '../contextApi/MyContext'
import { Categories } from '../Common/Data/Categories'

const NavBarMenu = () => {
    const navList = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '' },
        { name: 'Blog', path: '/blog' },
        { name: 'Admin', path: '/admin/dashboard' },
        { name: 'Orders', path: '/protected/orders' },
    ]
    // , 'Theme Features'
    const [toSearch, setToSearch] = useState('');
    const { setNavBarMenu, setIsSidebarOpen, isSidebarOpen, cartSize } = useContext(MyContext);
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
    }

    return (
        <div className='z-[2] fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0'>
            <div className={`w-[36%] min-w-[300px] h-screen text-white text-smallScreenContent bg-white flex flex-col gap-[15px] p-[10px] themeScroll ${forClose ? 'animate-navBarMenuOpen' : 'animate-navBarMenuClose'}`}>
                <div className='text-textColour text-[20px] p-[10px] flex justify-end' onClick={() => { setForClose(false); setTimeout(() => { setNavBarMenu(false); }, 500); }}><RxCross1 /></div>
                <div className='font-bodyFont border flex p-[10px] justify-between text-textColour cursor-pointer'>
                    <div className='flex gap-[5px]'>
                        <div><p className='uppercase'>Cart</p></div>
                        <div>{cartSize}</div>
                    </div>
                    <div className='text-[20px]' onClick={() => setIsSidebarOpen(!isSidebarOpen)}><MdOutlineShoppingCart /></div>
                </div>
                <div className='flex flex-col justify-center text-textColour gap-[10px]'>
                    {navList.map((item, index) => (
                        item.name === 'Shop'
                            ?
                            <div key={index}>
                                <div className='flex items-center justify-between border-b p-[10px]'>
                                    <p className='font-bodyFont'>{item.name}</p><MdKeyboardArrowDown onClick={() => setShopItem(!shopItem)} className={`text-[20px] ${shopItem ? 'rotate-180 animate-arrowRotate' : 'animate-arrowRotateBack'}`} />
                                </div>
                                {shopItem &&
                                    <div className='p-[10px] pr-0 flex flex-col gap-[10px]'>
                                        {Categories.map((obj, idx) => {
                                            return (
                                                <div key={idx} className=''>
                                                    <div className='border-b p-[10px] flex items-center justify-between'>
                                                        <Link to={obj.main.path} onClick={() => { setForClose(false); setTimeout(() => { setNavBarMenu(false); }, 500); }}><p>{obj.main.title}</p></Link>
                                                        <MdKeyboardArrowDown onClick={() => subShopItemSetter(idx)} className={`text-[20px] ${subShopItem[idx].value ? 'rotate-180 animate-arrowRotate' : 'animate-arrowRotateBack'}`} />
                                                    </div>
                                                    {subShopItem[idx].value &&
                                                        <div className='p-[10px] flex flex-col gap-[10px]'>
                                                            {obj.list.map((subObj, subIdx) => (
                                                                <Link key={subIdx} to={subObj.path} onClick={() => { setForClose(false); setTimeout(() => { setNavBarMenu(false); }, 500); }}><p className='border-b p-[10px]'>{subObj.title}</p></Link>
                                                            ))}
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                }

                            </div>
                            : <Link key={index} to={item.path} onClick={() => { setForClose(false); setTimeout(() => { setNavBarMenu(false); }, 500); }}>
                                <p className='font-bodyFont cursor-pointer p-[10px] border-b' key={index}>{item.name}</p>
                            </Link>
                    ))}
                </div>
                <div className='border flex items-center p-[10px] rounded-[5px] gap-[10px] justify-between'>
                    <div className='w-full'>
                        <input className='w-full outline-none font-bodyFont text-smallScreenContent text-textColour' type='text' placeholder='Search' onChange={(e) => { setToSearch(e.target.value) }} value={toSearch} />
                    </div>
                    <div className='cursor-pointer text-textColour'>
                        <FaSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBarMenu