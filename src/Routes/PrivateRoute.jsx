import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../pages/shared/Navbar/Loading/LoadingSpinner';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const{user,loading} =useAuth();
    if (loading){
        return <LoadingSpinner></LoadingSpinner>
    };
    if (!user) {
        <Navigate to="/login"></Navigate>
        
    }
    return children;
       
    
};

export default PrivateRoute;