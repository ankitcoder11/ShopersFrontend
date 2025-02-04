import React from 'react';
import ButtonLoader from './ButtonLoader'; // Assuming ButtonLoader is in the same folder

const LargeButton = ({ isLoading, onClick, text, className }) => {
    return (
        <button
            onClick={(e) => { e.preventDefault(); onClick(); }}
            type='submit'
            className={`p-[13px] text-[13px] text-center border-[1px] border-black cursor-pointer font-bodyFont ${className} flex justify-center items-center`}
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
