import React, { useState, useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const ProductImageSlider = ({ images }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [startTouch, setStartTouch] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);

    const handleSwipeStart = (e) => {
        const touchStart = e.touches ? e.touches[0].clientX : e.clientX;
        setStartTouch(touchStart);
        setIsDragging(true);
    };

    const handleSwipeMove = (e) => {
        if (startTouch === 0) return;

        const touchMove = e.touches ? e.touches[0].clientX : e.clientX;

        if (touchMove === undefined) return;

        const swipeDistance = startTouch - touchMove;

        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) showNextImage();
            else showPrevImage();
            setStartTouch(0);
            setIsDragging(false);
        }
    };

    const handleSwipeEnd = () => {
        setStartTouch(0);
        setIsDragging(false);
    };

    const showNextImage = () => {
        if (imageIndex === images?.length - 1) return setImageIndex(0);
        return setImageIndex(imageIndex + 1);
    };

    const showPrevImage = () => {
        if (imageIndex === 0) return setImageIndex(images?.length - 1);
        return setImageIndex(imageIndex - 1);
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };

    return (
        <div ref={sliderRef} className='w-full h-full flex overflow-hidden'
            onTouchStart={handleSwipeStart} onTouchMove={handleSwipeMove} onTouchEnd={handleSwipeEnd}
            onMouseDown={handleSwipeStart} onMouseMove={handleSwipeMove} onMouseUp={handleSwipeEnd}
            onMouseLeave={handleSwipeEnd}
        >
            {images?.map((item, index) => (
                <img key={index} src={item} onDragStart={handleDragStart}
                    className='w-full h-full object-cover block flex-shrink-0 flex-grow-0 transition-all ease-in-out duration-300'
                    style={{
                        translate: `${-100 * imageIndex}%`,
                        cursor: isDragging ? 'grabbing' : 'default'
                    }}
                />
            ))}
            {/* <div onClick={showPrevImage} className="absolute left-5 max-[500px]:left-1 top-1/2 transform -translate-y-1/2 text-white text-4xl max-[500px]:text-[25px] cursor-pointer hover:bg-white hover:text-black p-2 max-[500px]:p-1 rounded-full">
                <MdKeyboardArrowLeft />
            </div>
            <div onClick={showNextImage} className="absolute right-5 max-[500px]:right-1 top-1/2 transform -translate-y-1/2 text-white text-4xl max-[500px]:text-[25px] cursor-pointer hover:bg-white hover:text-black p-2 max-[500px]:p-1 rounded-full">
                <MdKeyboardArrowRight />
            </div> */}
            <div className="absolute flex gap-[10px] items-center left-[45%] bottom-[5px] ">
                {images?.map((_, index) => (
                    <div key={index} onClick={() => setImageIndex(index)} className={`h-[10px] w-[10px] rounded-full ${index === imageIndex ? 'bg-gray-800' : 'bg-gray-400'}`}></div>
                ))}
            </div>
        </div>
    );
};

export default ProductImageSlider; 