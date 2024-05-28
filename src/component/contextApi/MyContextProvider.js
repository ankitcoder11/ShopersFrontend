import React, { useState } from 'react'
import { MyContext } from './MyContext'

const MyContextProvider = ({ children }) => {
    const [navBarMenu, setNavBarMenu] = useState(false);

    return (
        <MyContext.Provider value={{ navBarMenu, setNavBarMenu }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContextProvider