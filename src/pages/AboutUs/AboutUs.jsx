import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto px-4 py-12"
        >
            <h2 className="text-4xl font-bold text-center mb-6 text-[#0B1120]">
                About HeartBridge
            </h2>

            <div className="mb-8">
                <img
                    src="https://i.postimg.cc/yxMfzN0q/pexels-214985283-15418616.jpg"
                    alt="HeartBridge Couple"
                    className="rounded-lg shadow-md w-full object-cover h-full"
                />
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify">
                <strong>HeartBridge</strong> is a modern, secure, and user-friendly matrimonial platform designed to help individuals find their ideal life partners in Bangladesh. Built as a full-stack MERN application, HeartBridge focuses on providing a smooth experience for users, showcasing detailed biodata, and offering premium features for enhanced visibility. Whether you're searching for a soulmate or just exploring, HeartBridge helps bridge hearts through trust, clarity, and technology.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-gray-800">
                <div>
                    <h3 className="text-xl font-semibold mb-2">💼 Core Features:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Dynamic biodata creation and editing</li>
                        <li>Premium membership options with Stripe payment</li>
                        <li>User and admin dashboards</li>
                        <li>Powerful biodata filtering (age, division, type, etc.)</li>
                        <li>Unique biodata ID system with role-based access</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">🔒 Technology Highlights:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>MERN Stack (MongoDB, Express, React, Node)</li>
                        <li>Firebase Authentication + JWT Security</li>
                        <li>TanStack Query for blazing-fast data fetching</li>
                        <li>Responsive design for all screen sizes</li>
                        <li>Secure admin routes and role management</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-md text-gray-600 italic">
                    "At HeartBridge, we don't just match biodatas — we connect hearts with dignity and trust."
                </p>
            </div>
        </motion.div>
    );
};

export default AboutUs;
