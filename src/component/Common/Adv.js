import React from 'react'
import { FiPhone } from 'react-icons/fi'
import { LuBadgeCheck } from 'react-icons/lu'
import { MdOutlineWatch } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'

const Adv = () => {
  const data = [
    { title: 'Flexible Finance options', icon: <MdOutlineWatch /> },
    { title: 'Worldwide Shipping', icon: <TbWorld /> },
    { title: 'Guaranteed Authentic', icon: <LuBadgeCheck /> },
    { title: 'Call us: 1-800-000-0000', icon: <FiPhone /> },
  ]
  return (
    <div className='w-full bg-topBarBg overflow-x-auto ankit '>
      <div className='flex justify-around gap-[10px] min-[1000px]:w-[65%] min-w-[900px] mx-auto p-[15px] overflow-x-scroll ankit'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center gap-[10px] font-semibold opacity-90 justify-center'>
            <div className='text-[25px] text-white'>{item.icon}</div>
            <p className='text-largeScreenContent font-bodyFont text-white'>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Adv