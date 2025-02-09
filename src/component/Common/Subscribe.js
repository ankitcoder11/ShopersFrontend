import React from 'react'
import { FacebookSocialMedia, InstagramSocialMedia, TwitterSocialMedia } from '../../utiles/SocialMedia';

const Subscribe = () => {
    return (
        <div className='bg-black text-white flex max-[500px]:flex-col max-[500px]:gap-[10px] justify-center h-[200px] max-[500px]:h-[250px] max-[500px]:p-[10px] items-center font-bodyFont'>
            <div className='w-[45%] max-[500px]:w-full flex flex-col gap-[5px]'>
                <h2 className='font-medium text-[20px] max-[500px]:text-[18px]'>Subscribe to our newsletter</h2>
                <p className='text-[14px] max-[500px]:text-[13px]'>Signup for our newsletter to stay up to date on sales and events.</p>
            </div>
            <div className='w-[45%] max-[500px]:w-full flex flex-col gap-[10px]'>
                <div className='w-full flex border-b-2'>
                    <input placeholder='Enter Your Email Address' type='text' className='placeholder-white bg-black outline-none text-[14px] max-[500px]:text-[13px] w-[90%] p-[10px]' />
                    <p className='p-[10px] cursor-pointer'>Join</p>
                </div>
                <div className='flex gap-5'>
                    <FacebookSocialMedia />
                    <TwitterSocialMedia />
                    <InstagramSocialMedia />
                </div>
            </div>
        </div>
    )
}

export default Subscribe