import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
    // Paste your 404 image URL here
    const errorImage = 'https://i.ibb.co.com/kgMtD5KH/Cyber-Bug-Search.jpg'; // Replace with your own image link

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-lg"
            >
                {/* 404 Image */}
                <motion.img
                    src={errorImage}
                    alt="404 Not Found"
                    className="w-60 h-40 mx-auto mb-6 drop-shadow-lg"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                />

                {/* Warning Icon */}
                <motion.div
                    className="flex justify-center mb-4"
                    initial={{ rotate: -15, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <AlertTriangle size={60} className="text-sky-600" />
                </motion.div>

                {/* Text */}
                <h1 className="text-5xl font-bold text-gray-800 mb-3">404</h1>
                <p className="text-lg text-gray-700 mb-4">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <p className="text-sm text-gray-600 mb-8">
                    It may have been moved, deleted, or you might have typed the wrong URL.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/"
                        className="px-6 py-2 my-2 bg-sky-500 text-white rounded-full shadow-md hover:bg-sky-600 transition-all duration-300"
                    >
                        Go Back Home
                    </Link>
                    <Link
                        to="/contact"
                        className="px-6 py-2 my-2 bg-white border border-sky-500 text-sky-500 rounded-full shadow-md hover:bg-sky-100 transition-all duration-300"
                    >
                        Contact Support
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
