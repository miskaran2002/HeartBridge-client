import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../pages/shared/Navbar/Loading/LoadingSpinner';
import { Navigate, useLocation, useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const{user,loading} =useAuth();
    const location =useLocation();
    console.log(location);
    
    if (loading){
        return <LoadingSpinner></LoadingSpinner>
    };
    if (!user) {
        return<Navigate state={{from:location.pathname}} replace to="/login"></Navigate>
        
    }
    return children;
       
    
};

export default PrivateRoute;