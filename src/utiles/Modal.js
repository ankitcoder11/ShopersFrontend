import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const Modal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) return null;  // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
            <div className="bg-white p-[20px] rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Update Quantity</h2>
                    <div className="cursor-pointer" onClick={closeModal}>
                        <RxCross1 />
                    </div>
                </div>
                <div>
                    {children}
                </div>
                {/* <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Modal;