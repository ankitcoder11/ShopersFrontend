import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const FacebookSocialMedia = () => {
    return (
        <Link to='https://www.facebook.com' target='_blank' ><FaFacebookF /></Link>
    )
}

const InstagramSocialMedia = () => {
    return (
        <Link to='https://www.instagram.com' target='_blank' ><FaInstagram /></Link>
    )
}

const TwitterSocialMedia = () => {
    return (
        <Link to='https://www.twitter.com' target='_blank' ><FaXTwitter /></Link>
    )
}

export { FacebookSocialMedia, InstagramSocialMedia, TwitterSocialMedia }