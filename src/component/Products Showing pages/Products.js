import React, { useEffect } from 'react'
import GetDataApi from '../../utiles/GetDataApi';
import { useLocation } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import Loader from '../../utiles/Loader';

const Products = () => {
  const location = useLocation()
  const fullPath = location.pathname;
  const url = fullPath.split('/')
  const productsData = GetDataApi(`${process.env.REACT_APP_API_URL}getproduct/get-${url[2]}`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {productsData?.isLoading ? <Loader /> :
        <div className='flex w-[95%] gap-[20px] flex-wrap mx-auto py-[20px]'>
          {productsData?.data?.data?.map((item, index) => {
            return (
              <SingleProduct key={index} index={index} data={item} />
            )
          })}
        </div>
      }
    </>
  )
}

export default Products