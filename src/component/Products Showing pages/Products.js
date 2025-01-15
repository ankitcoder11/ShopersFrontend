import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import Loader from '../../utiles/Loader';
import { fetchProducts } from '../../api/products';

const Products = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [productsData, setProductsData] = useState()
  const location = useLocation()
  const fullPath = location.pathname;
  const url = fullPath.split('/')
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts(url[2]);
        setProductsData(response?.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {isLoading ? <Loader /> :
        <div className='flex w-[95%] gap-[20px] flex-wrap mx-auto py-[20px]'>
          {productsData?.map((item, index) => {
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