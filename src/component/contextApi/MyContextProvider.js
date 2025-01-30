import React, { useEffect, useState } from 'react'
import { MyContext } from './MyContext'
import Cookies from 'js-cookie';
import { fetchCart } from '../../api/cart';

const MyContextProvider = ({ children }) => {
    const [navBarMenu, setNavBarMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [cartSize, setCartSize] = useState(0);
    const isAuthenticated = Boolean(Cookies.get('accessToken'));

    // cart
    const [fetchCartLoading, setfetchCartLoading] = useState(false)
    const [cartItems, setCartItems] = useState();


    const fetchCartItems = async () => {
        setfetchCartLoading(true)
        try {
            const response = await fetchCart(user?._id);
            setCartItems(response?.data?.items)
            setCartSize(response?.data?.items?.length)
        } catch (err) {
            // console.error(err)
            // toast.error("Something went wrong")
        } finally {
            setfetchCartLoading(false)
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            const userDetails = JSON.parse(localStorage.getItem('user'));
            setUser(userDetails);
            setIsAdmin(userDetails?.email === 'ankit@gmail.com');
            setLoading(false);
        } else {
            localStorage.removeItem('user')
            setLoading(false);
        }
    }, []);
    return (
        <MyContext.Provider value={{
            navBarMenu,
            setNavBarMenu,
            user,
            isAdmin,
            setIsAdmin,
            loading,
            isSidebarOpen,
            setIsSidebarOpen,
            //cat
            fetchCartItems,
            cartSize,
            setCartSize,
            cartItems,
            fetchCartLoading,
            setCartItems
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContextProvider