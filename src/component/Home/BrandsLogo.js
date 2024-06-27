import React from 'react'

const BrandsLogo = () => {
    const logosData = [
        "https://fashionopolism-galleria.myshopify.com/cdn/shop/files/image_grid4.jpg?v=1613696317&width=800",
        "https://fashionopolism-galleria.myshopify.com/cdn/shop/files/image_grid3.jpg?v=1613696317&width=800",
        "https://fashionopolism-galleria.myshopify.com/cdn/shop/files/image_grid2.jpg?v=1613696317&width=800",
        "https://fashionopolism-galleria.myshopify.com/cdn/shop/files/image_grid1.jpg?v=1613696317&width=800"
    ]
    return (
        <div className='flex w-full justify-evenly p-[10px]'>
            {logosData.map((item, index) => (
                <div key={index} className='w-[20%]'>
                    <img src={item} alt='Not Found' className='w-full' />
                </div>
            ))}
        </div>
    )
}

export default BrandsLogo