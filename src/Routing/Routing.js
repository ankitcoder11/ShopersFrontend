import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TopBar from '../component/Common/TopBar'
import Header from '../component/Common/Header'
import NavBar from '../component/Common/NavBar'
import Adv from '../component/Common/Adv'
import Home from '../component/Home/Home'
import Subscribe from '../component/Common/Subscribe'
import Footer from '../component/Common/Footer'
import Login from '../component/Login/Login'
import { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie';
import ProtectedRoute from './ProtectedRoute'
import RoleBasedRoute from './RoleBasedRoute'
import CreateProducts from '../component/Admin/CreateProducts'
import MensHome from '../component/Mens/MensHome'
import ElectronicsHome from '../component/Electronics/ElectronicsHome'
import WomensHome from '../component/Womens/WomensHome'
import AllProducts from '../component/Admin/AllProducts'

const LayoutWrapper = ({ children }) => {
    return (
        <>
            <div className="flex flex-col gap-[15px] relative">
                <TopBar />
                <div className="bg-headerBg flex flex-col gap-[15px]">
                    <Header />
                    <NavBar />
                    <Adv />
                </div>
            </div>
            {children}
            <Subscribe />
            <Footer />
        </>
    );
};

const Routing = () => {
    const isAuthenticated = Boolean(Cookies.get('accessToken'));
    const userDetailes = JSON.parse(localStorage.getItem('user'));
    const isAdmin = Boolean(userDetailes?.email === 'ankit@gmail.com');
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*"
                    element={
                        <LayoutWrapper>
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </LayoutWrapper>
                    }
                />
                <Route path='/products/*'
                    element={
                        <LayoutWrapper>
                            <Routes>
                                <Route path="mens" element={<MensHome />} />
                                {/* <Routes path="mens/:productId" element={<MensProductDetail />} /> */}
                                <Route path="electronics" element={<ElectronicsHome />} />
                                <Route path="womens" element={<WomensHome />} />
                            </Routes>
                        </LayoutWrapper>
                    }
                />
                {/* const { productId } = useParams(); */}
                <Route path="/protected"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <LayoutWrapper>
                                {/* Protected Component goes here */}
                            </LayoutWrapper>
                        </ProtectedRoute>
                    }
                />
                <Route path="/admin/*"
                    element={
                        <RoleBasedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                            <LayoutWrapper>
                                <Routes>
                                    <Route path="createproduct" element={<CreateProducts />} />
                                    <Route path="allproducts" element={<AllProducts />} />
                                </Routes>
                            </LayoutWrapper>
                        </RoleBasedRoute>
                    }
                />
            </Routes>
        </>
    )
}

export default Routing