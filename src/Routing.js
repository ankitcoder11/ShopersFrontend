import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopBar from './component/Common/TopBar'
import Header from './component/Common/Header'
import NavBar from './component/Common/NavBar'
import Adv from './component/Common/Adv'
import Home from './component/Home/Home'
import Subscribe from './component/Common/Subscribe'
import Footer from './component/Common/Footer'

const Routing = () => {
    return (
        <BrowserRouter>
            <div className='flex flex-col gap-[15px] relative'>
                <TopBar />
                <div className='bg-headerBg flex flex-col gap-[15px]'>
                    <Header />
                    <NavBar />
                    <Adv />
                </div>
            </div>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/login' element={} /> */}
            </Routes>
            <Subscribe/>
            <Footer/>
        </BrowserRouter>
    )
}

export default Routing