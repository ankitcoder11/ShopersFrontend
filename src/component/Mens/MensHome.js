import React from 'react'
import GetDataApi from '../../utiles/API/GetDataApi';
import AllProductsGrid from '../../utiles/AllProductsGrid';

const MensHome = () => {
  const productsData = GetDataApi(`${process.env.REACT_APP_API_URL}getproduct/get-mens`);
  console.log(productsData?.data?.data)
  return (
    <div className='py-[10px] w-[95%] mx-auto '>
      <AllProductsGrid data={productsData?.data?.data} />
    </div>
  )
}

export default MensHome