import React from 'react'
import { FacebookSocialMedia, InstagramSocialMedia, TwitterSocialMedia } from '../../utiles/SocialMedia';

const Subscribe = () => {
    return (
        <div className='bg-black text-white flex justify-center h-[200px] items-center font-bodyFont'>
            <div className='w-[45%] flex flex-col gap-[5px]'>
                <h2 className='font-medium text-[20px]'>Subscribe to our newsletter</h2>
                <p className='text-[14px]'>Signup for our newsletter to stay up to date on sales and events.</p>
            </div>
            <div className='w-[45%] flex flex-col gap-[10px]'>
                <div className='w-full flex border-b-2'>
                    <input placeholder='Enter Your Email Address' type='text' className='placeholder-white bg-black outline-none text-[14px] w-[90%] p-[10px]' />
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