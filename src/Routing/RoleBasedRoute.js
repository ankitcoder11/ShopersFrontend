import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, isAuthenticated, isAdmin }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (!isAdmin) {
        return <Navigate to="/" />;
    }
    return children;
};

export default RoleBasedRoute;
