import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopBar from './component/Common/TopBar'
import Header from './component/Common/Header'
import NavBar from './component/Common/NavBar'

const Routing = () => {
    return (
        <BrowserRouter>
            <div className='flex flex-col gap-[15px] relative'>
                <TopBar />
                <div className='bg-headerBg flex flex-col gap-[15px]'>
                    <Header />
                    <NavBar />
                </div>
            </div>
            <Routes>
                <Route path='/' />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing