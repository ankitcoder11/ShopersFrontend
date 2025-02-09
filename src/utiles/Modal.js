import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

const Modal = ({ isOpen, closeModal, children, heading, width, height }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
            <div className='bg-white p-[20px] rounded-lg shadow-lg overflow-auto'
                style={{ height: height || '', width: screenWidth < '550' ? '80vw' : width || '' }}>
                <div className="flex justify-between items-center pb-[10px]">
                    <h2 className="text-xl font-semibold">{heading}</h2>
                    <div className="cursor-pointer" onClick={closeModal}>
                        <RxCross1 />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;