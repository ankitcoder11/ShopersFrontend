import React from 'react'
import GetDataApi from '../../utiles/API/GetDataApi';
import AllProductsGrid from '../../utiles/AllProductsGrid';

const WomensHome = () => {
    const productsData = GetDataApi(`${process.env.REACT_APP_API_URL}getproduct/get-womens`);
    console.log(productsData)
    return (
        <div>
            <AllProductsGrid data={productsData?.data?.data} />
        </div>
    )
}

export default WomensHome