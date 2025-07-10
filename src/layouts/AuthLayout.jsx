import React from 'react';
import { Outlet, Link } from 'react-router';
import { motion } from 'framer-motion';
import HeartBridge from '../pages/shared/heartbridgelogo/HeartBridge';

const AuthLayout = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white overflow-hidden relative">
                {/* Logo - absolute positioned */}
                <Link
                    to="/"
                    className="absolute top-4 left-4 z-50"
                    aria-label="Go to homepage"
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-transparent rounded-md overflow-hidden">
                        <HeartBridge />
                    </div>
                </Link>


                {/* Left side: Form content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    // Add left padding on md screens and above to avoid logo overlap
                    className="w-full md:w-1/2  flex items-center justify-center p-6 md:pl-20"
                >
                    <div className="w-[300px] max-w-md">
                        <Outlet />
                    </div>
                </motion.div>

                {/* Right side: Background Image with logo */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full md:w-1/2 h-[300px] md:h-screen"
                >
                    <img
                        src="https://i.ibb.co/LdbGyXNZ/pexels-widyadityahidayat-9717124.jpg"
                        alt="Auth illustration"
                        className="object-cover object-center"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default AuthLayout;
