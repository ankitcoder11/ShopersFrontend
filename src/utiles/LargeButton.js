import React from 'react';
import ButtonLoader from './ButtonLoader'; // Assuming ButtonLoader is in the same folder

const LargeButton = ({ isLoading, onClick, text, className }) => {
    return (
        <div
            onClick={onClick}
            className={`p-[13px] text-[13px] text-center border-[1px] border-black cursor-pointer ${className} flex justify-center items-center`}
            style={{ minWidth: '100px', height: '45px' }}
        >
            {isLoading ? (
                <ButtonLoader />
            ) : (
                <span>{text}</span>
            )}
        </div>
    );
};

export default LargeButton;
