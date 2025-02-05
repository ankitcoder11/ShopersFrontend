import React from 'react';
import ButtonLoader from './ButtonLoader'; // Assuming ButtonLoader is in the same folder

const LargeButton = ({ isLoading, onClick, text, className }) => {
    return (
        <button
            onClick={(e) => { e.preventDefault(); onClick(); }}
            type='submit'
            className={`bg-[#2b2b2b] text-white uppercase font-medium p-[13px] text-[13px] text-center border-[1px] border-black cursor-pointer font-buttonFont hover:bg-black transition duration-300 ease-linear ${className} flex justify-center items-center`}
            style={{ minWidth: '100px', height: '45px' }}
        >
            {isLoading ? (
                <ButtonLoader />
            ) : (
                <span>{text}</span>
            )}
        </button>
    );
};

export const ButtonWhite = ({ isLoading, onClick, text, className }) => {
    return (
        <button
            onClick={(e) => { e.preventDefault(); onClick(); }}
            type='submit'
            className={`bg-[#ededed] text-[#2b2b2b] uppercase font-medium p-[13px] text-[13px] text-center border-[1px] border-black cursor-pointer font-buttonFont transition duration-300 ease-linear ${className} flex justify-center items-center`}
            style={{ minWidth: '100px', height: '45px' }}
        >
            {isLoading ? (
                <ButtonLoader />
            ) : (
                <span>{text}</span>
            )}
        </button>
    );
};

export default LargeButton;