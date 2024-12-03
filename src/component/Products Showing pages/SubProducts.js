import React from 'react'
import { useParams } from 'react-router-dom'
import GetDataApi from '../../utiles/API/GetDataApi';
import SingleProduct from './SingleProduct';
import Loader from '../../utiles/Loader';

const SubProducts = () => {
  const category = useParams();
  const categoryPath = category['*'];
  const mainCategory = categoryPath.split('/')[0];
  const subCategory = category.productId;
  const productsData = GetDataApi(`${process.env.REACT_APP_API_URL}getproduct/get-${mainCategory}`);
  const filterData = productsData?.data?.data.filter(
    (item) => item?.category?.toLowerCase() === subCategory?.toLowerCase()
  );
  return (
    <>
      {productsData?.isLoading ? <Loader /> :
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