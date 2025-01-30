import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SingleProduct from './SingleProduct';
import Loader from '../../utiles/Loader';
import { fetchProducts } from '../../api/products';

const SubProducts = () => {
  const category = useParams();
  const categoryPath = category['*'];
  const mainCategory = categoryPath.split('/')[0];
  const subCategory = category.productId;

  const [productsData, setProductsData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts(mainCategory);
        setProductsData(response?.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [mainCategory]);

  const filterData = productsData?.filter(
    (item) => item?.category?.toLowerCase() === subCategory?.toLowerCase()
  );
  return (
    <>
      {isLoading ? <Loader /> :
        <div className='flex w-[95%] gap-[20px] flex-wrap mx-auto py-[20px] '>
          {filterData?.map((item, index) => {
            return (
              <SingleProduct key={index} index={index} data={item} />
            )
          })}
        </div>
      }
    </>
  )
}

export default SubProducts