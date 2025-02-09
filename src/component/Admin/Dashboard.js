import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='h-[50vh] flex max-[410px]:flex-col justify-center items-center gap-[20px]'>
      <Link to='/admin/createproduct'><div className='border p-[10px] px-[20px] border-gray-400 font-bodyFont cursor-pointer bg-gray-200 hover:bg-black hover:text-white transition-all duration-500'>Create Products</div></Link>
      {/* <Link to='/admin/products'><div className='border p-[10px] px-[20px] border-gray-400 font-bodyFont cursor-pointer bg-gray-200 hover:bg-black hover:text-white transition-all duration-500'>Products</div></Link> */}
      <Link to='/admin/orders'><div className='border p-[10px] px-[20px] border-gray-400 font-bodyFont cursor-pointer bg-gray-200 hover:bg-black hover:text-white transition-all duration-500'>Orders</div></Link>
    </div>
  )
}

export default Dashboard