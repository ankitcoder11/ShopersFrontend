import React from 'react'
import { ReactComponent as VISA } from '../svg/visa.svg';
import { ReactComponent as MASTER } from '../svg/master.svg';
import { ReactComponent as AMERICAN } from '../svg/american.svg';
import { ReactComponent as PAYPAL } from '../svg/paypal.svg';
import { ReactComponent as UNK } from '../svg/unk.svg';
import { ReactComponent as DISCOVER } from '../svg/discover.svg';
import { FacebookSocialMedia, InstagramSocialMedia, TwitterSocialMedia } from '../../utiles/SocialMedia';
const Footer = () => {
    const footerData = [
        { title: 'ABOUT', disc: 'Our products are inspired by the people and world around us. Beautiful, high quality goods that are designed especially for you. Discover our story and meet the people that make our brand what it is.' },
        { title: 'EXPLORE', list: [{ name: 'About Us', path: '/pages/about-us' }, { name: 'Theme Features', path: '/pages/theme-features' }] },
        { title: 'QUICK LINKS', list: [{ name: 'Audemars Piguet', path: '/collections/audemars-piguet' }, { name: 'Breitling', path: '/collections/breitling' }, { name: 'Hublot', path: '/collections/hublot' }, { name: 'IWC', path: '/collections/iwc' }, { name: 'Omega', path: '/collections/omega' }, { name: 'Tag Heuer', path: '/collections/tag-heuer' }] },
        { title: 'RECENT POSTS', list: [{ name: 'A practical guide to watches', path: '/blogs/news/a-practical-guide-to-watches' }, { name: 'Millionaires of the 21st Century', path: '/blogs/news/78257667-watches-of-monaco' }, { name: 'What to Get That Special September Someone', path: '/blogs/news/78257155-watches-of-wall-street' }] }
    ]
    return (
        <div className='p-[50px] pb-[20px] flex flex-col h-[150px] justify-between text-[14px] font-bodyFont text-textColour'>
            {/* <div className='flex justify-between'>
                {
                    footerData.map((obj, index) => {
                        return (
                            obj.title === 'ABOUT' ?
                                (
                                    <div key={index} className='flex flex-col gap-[20px] w-[20%]'>
                                        <p className='text-[18px]'>{obj.title}</p>
                                        <p>{obj.disc}</p>
                                    </div>
                                ) :
                                (
                                    <div key={index} className='flex flex-col gap-[20px] w-[20%]'>
                                        <p className='text-[18px]'>{obj.title}</p>
                                        <div>
                                            {
                                                obj.list.map((item, index) => {
                                                    return (
                                                        <Link to={item.path} key={index} className='allAnchorsBlack'><p> {item.name}</p></Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                        )
                    })
                }
            </div> */}
            <div className='flex justify-between items-end'>
                <div className='flex flex-col gap-[15px] '>
                    <div className='flex gap-[10px]'>
                        <FacebookSocialMedia />
                        <TwitterSocialMedia />
                        <InstagramSocialMedia />
                    </div>
                    <div><p>© 2024 Soppers adda • Powered by Ankit</p></div>
                </div>
                <div className='flex gap-[15px]'>
                    <VISA />
                    <MASTER />
                    <AMERICAN />
                    <PAYPAL />
                    <UNK />
                    <DISCOVER />
                </div>
            </div>
        </div>
    )
}

export default Footer