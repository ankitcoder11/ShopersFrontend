import React, { useContext } from 'react'
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
import Products from '../component/Products Showing pages/Products'
import ProductsAdmin from '../component/Admin/ProductsAdmin'
import SubProducts from '../component/Products Showing pages/SubProducts'
import Dashboard from '../component/Admin/Dashboard'
import ProductDesc from '../component/Products Showing pages/ProductDesc'
import { MyContext } from '../component/contextApi/MyContext'
import ProductEditor from '../component/Admin/ProductEditor'
import Loader from '../utiles/Loader'
import CartSideBar from '../component/Common/CartSideBar'
import Cart from '../component/Cart/Cart'
import Checkout from '../component/Checkout/Checkout'
import Orders from '../component/Profile/Orders'
import AdminOrders from '../component/Admin/AdminOrders'
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
    const { isAdmin, loading } = useContext(MyContext);
    if (loading) {
        return <Loader />
    }
    return (
        <>
            <Toaster />
            <CartSideBar />
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
                                <Route path="mens" element={<Products />} />
                                <Route path="mens/:productId/:product" element={<ProductDesc />} />
                                <Route path="mens/:productId" element={<SubProducts />} />

                                <Route path="electronics" element={<Products />} />
                                <Route path="electronics/:productId/:product" element={<ProductDesc />} />
                                <Route path="electronics/:productId" element={<SubProducts />} />

                                <Route path="womens" element={<Products />} />
                                <Route path="womens/:productId/:product" element={<ProductDesc />} />
                                <Route path="womens/:productId" element={<SubProducts />} />
                                <Route path="*" element={<div>Page not found</div>} />
                            </Routes>

                        </LayoutWrapper>
                    }
                />
                <Route path="/protected/*"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <LayoutWrapper>
                                <Routes>
                                    {/* Protected Component goes here */}
                                    <Route path="cart" element={<Cart />} />
                                    <Route path="orders" element={<Orders />} />
                                </Routes>
                            </LayoutWrapper>
                        </ProtectedRoute>
                    }
                />

                <Route path="/protected/checkout" element={<Checkout />} />

                <Route path="/admin/*"
                    element={
                        <RoleBasedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                            <LayoutWrapper>
                                <Routes>
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="createproduct" element={<CreateProducts />} />
                                    <Route path="products" element={<ProductsAdmin />} />
                                    <Route path="products/:category/:subcategory/:product" element={<ProductEditor />} />
                                    <Route path="orders" element={<AdminOrders />} />
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