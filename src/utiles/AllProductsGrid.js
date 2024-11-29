import React from 'react'
import SingleProduct from './SingleProduct'

const AllProductsGrid = ({ data }) => {
    return (
        <div className='flex gap-[20px] flex-wrap'>
            {data?.map((item, index) => {
                return (
                    <SingleProduct key={index} data={item} />
                )
            })}
        </div>
    )
}

export default AllProductsGrid