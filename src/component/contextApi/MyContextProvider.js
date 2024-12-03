import React, { useEffect, useState } from 'react'
import { MyContext } from './MyContext'

const MyContextProvider = ({ children }) => {
    const [navBarMenu, setNavBarMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('user'));
        setUser(userDetails);
        setIsAdmin(userDetails?.email === 'ankit@gmail.com');
        setLoading(false);
    }, []);
    return (
        <MyContext.Provider value={{ navBarMenu, setNavBarMenu, user, isAdmin, loading }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContextProvider