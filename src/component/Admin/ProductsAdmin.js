import React, { useEffect, useState } from 'react';
import { Categories } from '../Common/Data/Categories';
import GetDataApi from '../../utiles/GetDataApi';
import SingleProduct from '../Products Showing pages/SingleProduct';
import Loader from '../../utiles/Loader';

const ProductsAdmin = () => {
    const [selected, setSelected] = useState({
        main: Categories[0]?.main?.title,
        sub: Categories[0]?.list[0]?.title,
    });
    const [callApi, setCallApi] = useState(Categories[0]?.main?.title.split(" ", 1)[0].toLowerCase());
    // Handle main category click
    const handleMainCategoryClick = (mainCategory) => {
        const selectedCategory = Categories.find((cat) => cat.main.title === mainCategory);
        setSelected({
            main: mainCategory,
            sub: selectedCategory?.list[0]?.title || '', // Default to the first subcategory
        });
    };

    // Handle subcategory click
    const handleSubCategoryClick = (mainCategory, subCategory) => {
        setSelected({ main: mainCategory, sub: subCategory });
    };

    useEffect(() => {
        const mainCategoryShort = selected.main.split(" ", 1)[0].toLowerCase();
        setCallApi(mainCategoryShort);
    }, [selected.main]);

    const productsData = GetDataApi(`${process.env.REACT_APP_API_URL}getproduct/get-${callApi}`);
    const filterData = productsData?.data?.data.filter(
        (item) => item?.category?.toLowerCase() === selected?.sub?.toLowerCase()
    );
    return (
        <div className="w-full flex gap-[10px]">
            {/* Sidebar */}
            <div className="w-[19%] font-bodyFont border-r flex flex-col gap-[10px]">
                <div className="font-logoFont text-[25px] text-center py-[20px] border-b ">MENU</div>
                {Categories.map((obj, idx) => (
                    <div key={idx} className="flex flex-col gap-[10px]">
                        {/* Main Category */}
                        <h1
                            onClick={() => handleMainCategoryClick(obj?.main?.title)}
                            className={
                                selected.main === obj?.main?.title
                                    ? 'font-buttonFont font-bold p-[10px] w-[90%] mx-auto pl-[20px] bg-black rounded-full text-white cursor-pointer'
                                    : 'cursor-pointer font-buttonFont font-bold p-[10px] w-[90%] mx-auto pl-[20px]'
                            }
                        >
                            {obj?.main?.title}
                        </h1>
                        {/* Sub-Categories */}
                        <div className="flex flex-col w-[100%]">
                            {obj.list.map((subObj, subIdx) => (
                                <div className="flex" key={subIdx}>
                                    <div className="w-[20%]"></div>
                                    <p
                                        onClick={() => handleSubCategoryClick(obj?.main?.title, subObj?.title)}
                                        className={
                                            selected.main === obj.main.title && selected.sub === subObj?.title
                                                ? 'cursor-pointer font-bodyFont text-largeScreenContent bg-gray-300 p-[10px] pl-[20px] w-[75%] rounded-full'
                                                : 'cursor-pointer font-bodyFont text-largeScreenContent p-[10px] pl-[20px] w-[75%] rounded-full'
                                        }
                                    >
                                        {subObj?.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Main Content */}
            <div className="w-[80%] py-[20px]">
                {productsData?.isLoading ? <Loader /> :
                    <div className="flex gap-[20px] flex-wrap">
                        {filterData?.map((item, index) => (
                            <SingleProduct key={index} index={index} data={item} />
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductsAdmin;