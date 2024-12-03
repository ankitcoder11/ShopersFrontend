import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MyContext } from '../component/contextApi/MyContext';
import Loader from '../utiles/Loader';

const RoleBasedRoute = ({ children, isAuthenticated }) => {
    const { isAdmin, loading } = useContext(MyContext);

    if (loading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RoleBasedRoute;