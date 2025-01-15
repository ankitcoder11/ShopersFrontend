import React, { useEffect, useState } from 'react'
import { MyContext } from './MyContext'

const MyContextProvider = ({ children }) => {
    const [navBarMenu, setNavBarMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [cartSize, setCartSize] = useState(0);

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('user'));
        setUser(userDetails);
        setIsAdmin(userDetails?.email === 'ankit@gmail.com');
        setLoading(false);
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
            cartSize,
            setCartSize
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContextProvider