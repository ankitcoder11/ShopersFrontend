import React, { useEffect, useState } from 'react';
import { Categories } from '../Common/Data/Categories';
import GetDataApi from '../../utiles/API/GetDataApi';
import AllProductsGrid from '../../utiles/AllProductsGrid';

const AllProducts = () => {
    // State for main category and subcategory
    const [selected, setSelected] = useState({ main: 'Mens Fashion', sub: 'Watches' });
    const [callApi, setCallApi] = useState('mens');
    const [data, setData] = useState();

    // Function to handle main category click
    const handleMainCategoryClick = (mainCategory) => {
        setSelected({
            main: mainCategory,
            sub: Categories.find((cat) => cat.title === mainCategory)?.list[0] || '', // Default to the first subcategory
        });
    };
    // Function to handle subcategory click
    const handleSubCategoryClick = (mainCategory, subCategory) => {
        setSelected({ main: mainCategory, sub: subCategory });
    };
    let arr = selected.main.split(" ", 1);
    useEffect(() => {
        setCallApi(arr[0].toLowerCase())
    }, [arr])
    const productsData = GetDataApi(`${process.env.REACT_APP_API_URL}getproduct/get-${callApi}`);
    console.log(productsData?.data?.data)
    const filterData = productsData?.data?.data.filter(item => item?.category?.toLowerCase() === selected?.sub?.toLowerCase());
    console.log(filterData);
    return (
        <div className="w-full flex gap-[10px]">
            {/* Sidebar */}
            <div className="w-[19%] font-bodyFont border-r flex flex-col gap-[10px]">
                <div className="font-logoFont text-[25px] text-center py-[20px] border-b ">MENU</div>
                {Categories.map((obj, idx) => (
                    <div key={idx} className="flex flex-col gap-[10px]">
                        {/* Main Category */}
                        <h1
                            onClick={() => handleMainCategoryClick(obj.title)}
                            className={
                                selected.main === obj.title
                                    ? 'font-buttonFont font-bold p-[10px] w-[90%] mx-auto pl-[20px] bg-black rounded-full text-white cursor-pointer'
                                    : 'cursor-pointer font-buttonFont font-bold p-[10px] w-[90%] mx-auto pl-[20px]'
                            }
                        >
                            {obj.title}
                        </h1>

                        {/* Sub-Categories */}
                        <div className="flex flex-col w-[100%]">
                            {obj.list.map((subObj, subIdx) => (
                                <div className="flex" key={subIdx}>
                                    <div className="w-[20%]"></div>
                                    <p
                                        onClick={() => handleSubCategoryClick(obj.title, subObj)}
                                        className={
                                            selected.main === obj.title && selected.sub === subObj
                                                ? 'cursor-pointer font-bodyFont text-largeScreenContent bg-gray-300 p-[10px] pl-[20px] w-[75%] rounded-full'
                                                : 'cursor-pointer font-bodyFont text-largeScreenContent p-[10px] pl-[20px] w-[75%] rounded-full'
                                        }
                                    >
                                        {subObj}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Main Content */}
            <div className="w-[80%] py-[20px]">
                {/* <h1 className="text-[25px] font-bold">{selected.main}</h1>
                <h2 className="text-[20px]">{selected.sub}</h2> */}
                <AllProductsGrid data={filterData} />
            </div>
        </div>
    );
};

export default AllProducts;