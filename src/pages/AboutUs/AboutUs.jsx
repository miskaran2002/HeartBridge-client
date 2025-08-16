import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CardSection = ({ title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=" dark:bg-gray-800 p-6 mb-8 rounded-xl shadow-md"
    >
        <h2 className="text-2xl font-semibold text-orange-800 mb-4">{title}</h2>
        <div className="text-base text-gray-800 dark:text-gray-200">{children}</div>
    </motion.div>
);

const AboutUs = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl mx-auto px-4 py-12 font-sans text-gray-900 dark:text-gray-200"
        >
            <h2 className="text-4xl font-bold text-center mb-8 text-orange-500">
                About HeartBridge
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                <img
                    src="https://i.ibb.co/8L9xkcLF/photo-myself.jpg"
                    alt="Founder Portrait"
                    className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-orange-600"
                />
                <div className="max-w-xl">
                    <p className="text-lg  text-orange-400 mb-4">
                        Hello! I am a passionate Computer Science student focused on software development, problem solving, and continuous learning.
                    </p>
                    <p className="text-base text-orange-400">
                        I strive to build scalable and efficient applications and love exploring new technologies to improve user experiences. This led me to create <strong>HeartBridge</strong>, a modern matrimonial platform for Bangladesh.
                    </p>
                </div>
            </div>

            <CardSection title="💼 Core Features:">
                <ul className="list-disc text-gray-700 list-inside space-y-1">
                    <li>User registration & login with Firebase Authentication</li>
                    <li>Biodata creation, editing, and detailed profile view</li>
                    <li>Premium membership with Stripe payment integration</li>
                    <li>Advanced biodata filtering (age, division, type)</li>
                    <li>Admin dashboard for managing users and premium approvals</li>
                    <li>Founder-driven vision: seamless experience inspired by modern web solutions</li>
                </ul>
            </CardSection>

            <CardSection title="🔒 Technology Highlights:">
                <ul className="list-disc  text-gray-700 list-inside space-y-1">
                    <li>MERN Stack (MongoDB, Express, React, Node)</li>
                    <li>JWT-based API security and role management</li>
                    <li>TanStack Query for efficient data fetching</li>
                    <li>Responsive design for desktop and mobile</li>
                    <li>Secure admin and user-specific routes</li>
                    <li>Loader + smooth fade-in animations with Framer Motion</li>
                </ul>
            </CardSection>

            <CardSection title="🎯 More About the Founder & Vision">
                <p className=' text-gray-700'>
                    I am highly motivated to learn and grow continuously. Problem-solving is my passion, and I aspire to create impactful platforms like HeartBridge that combine technology with human connection.
                </p>
            </CardSection>

            <div className="mt-8 text-center">
                <p className="text-md text-gray-600 dark:text-gray-700 italic">
                    "HeartBridge connects hearts, ensuring trust, transparency, and technology come together to help individuals find their perfect match."
                </p>
            </div>
        </motion.section>
    );
};

export default AboutUs;
