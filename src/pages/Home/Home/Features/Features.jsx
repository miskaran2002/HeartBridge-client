import React from 'react';
import { FaUserCheck, FaLock, FaHeart } from "react-icons/fa";

const features = [
    {
        title: 'Verified Biodatas',
        description: 'All biodatas are verified to ensure genuine and trustworthy connections.',
        icon: <FaUserCheck className="text-5xl text-pink-500 mb-4" />,
    },
    {
        title: 'Safe & Secure',
        description: 'We prioritize your privacy and keep your information safe at all times.',
        icon: <FaLock className="text-5xl text-blue-500 mb-4" />,
    },
    {
        title: 'Successful Matches',
        description: 'Thousands of couples have already found their life partners through us.',
        icon: <FaHeart className="text-5xl text-rose-500 mb-4" />,
    },
];

const HeartBridgeFeatures = () => {
    return (
        <section className="bg-base-200 dark:bg-gray-950 py-16 px-6">
            <h2 className="text-3xl font-extrabold text-center mb-12 ">
                ❤️ Why Choose HeartBridge?
            </h2>

            <div className="space-y-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group flex flex-col md:flex-row items-center bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-pink-500/30"
                    >
                        <div className="flex-shrink-0">
                            {feature.icon}
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-pink-200 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HeartBridgeFeatures;
