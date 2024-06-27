import React from 'react'

const AdvHome = () => {
    return (
        <div className='w-full overflow-auto'>
            <div className='flex bg-black text-white font-bodyFont text-[14px] p-[30px] w-full min-w-[1000px]'>
                <div className='flex items-center flex-col border-r-[1px] w-[33%] opacity-90' >
                    <h3 className='text-[22px] max-[500px]:text-[18px] tracking-wider font-medium'>EXTENDED WARRANTY</h3>
                    <p>UP TO 10 YEAR COVERAGE</p>
                </div>
                <div className='flex items-center flex-col border-r-[1px] w-[33%] opacity-90'>
                    <h3 className='text-[22px] max-[500px]:text-[18px] tracking-wider font-medium'>FREE SHIPPING</h3>
                    <p>2-3 DAY SERVICE AVAILABLE</p>
                </div>
                <div className='flex items-center flex-col w-[33%] opacity-90'>
                    <h3 className='text-[22px] max-[500px]:text-[18px] tracking-wider font-medium'>FREE 30 DAY RETURNS</h3>
                    <p>OFFERED ON ALL ITEMS</p>
                </div>
            </div>
        </div>
    )
}

export default AdvHome