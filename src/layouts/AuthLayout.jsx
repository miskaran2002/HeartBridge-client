import React from 'react';
import { Outlet } from 'react-router';
import { motion } from 'framer-motion';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white overflow-hidden">

            {/* Left side (Image) */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 h-[300px] md:h-screen"
            >
                <img
                    src="https://i.ibb.co/LdsJLTps/pexels-leeloothefirst-5055783.jpg" // replace with your own
                    alt="Auth illustration"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Right side (Outlet content) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 h-full flex items-center justify-center p-6"
            >
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </motion.div>

        </div>
    );
};

export default AuthLayout;
