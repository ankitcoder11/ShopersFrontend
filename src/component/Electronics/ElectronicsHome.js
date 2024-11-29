import React from 'react'
import GetDataApi from '../../utiles/API/GetDataApi';
import AllProductsGrid from '../../utiles/AllProductsGrid';

const ElectronicsHome = () => {
  const productsData = GetDataApi(`${process.env.REACT_APP_API_URL}getproduct/get-electronics`);
  console.log(productsData?.data?.data)
  return (
    <div>
      <AllProductsGrid data={productsData?.data?.data} />
    </div>
  )
}

export default ElectronicsHome