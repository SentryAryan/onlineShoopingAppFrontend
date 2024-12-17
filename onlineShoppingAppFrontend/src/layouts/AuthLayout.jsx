import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthLayout = ({ children }) => {
    const isLogin = useSelector(state => state.isLogin);

    if (!isLogin) {
        toast.error("Please login to access this page");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthLayout; 