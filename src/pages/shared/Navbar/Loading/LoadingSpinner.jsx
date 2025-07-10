import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-16 h-16 border-4 border-primary border-t-secondary rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
