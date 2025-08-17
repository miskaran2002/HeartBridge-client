import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: 'Sadia Akter',
        role: 'Happy Member',
        comment:
            'HeartBridge helped me connect with amazing people who share my interests. Truly life-changing!',
        img: 'https://i.ibb.co/nNp8zvV6/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confide.jpg',
    },
    {
        name: 'Rafiq Hasan',
        role: 'Community Mentor',
        comment:
            'Being part of HeartBridge has allowed me to guide and support others in building meaningful connections.',
        img: 'https://i.ibb.co/0pSxdLTj/portrait-happy-smiling-young-businessman-blue-suit-isolated-white-wall.jpg',
    },
    {
        name: 'Farzana Akter',
        role: 'Regular Member',
        comment:
            'HeartBridge makes it so easy to meet like-minded individuals. I feel more connected than ever!',
        img: 'https://i.ibb.co/HpGZCvVw/beautiful-smart-asian-young-entrepreneur-business-woman-owner-sme-checking-product-stock-scan-qr-cod.jpg',
    },
];

const CustomerTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const currentReview = testimonials[currentIndex];

    return (
        <section className=" dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-6 md:px-12 lg:px-24 text-center transition-colors duration-300">
            {/* Top Image */}
            <img
                src="https://i.ibb.co/Pvtw62B4/business-woman-feeling-happy-smiling-looking-camera-while-working-her-office-home.jpg"
                alt="Customer Feedback"
                className="mx-auto rounded-2xl h-[350px] w-[550px] mb-6 object-cover"
            />

            {/* Title and Description */}
            <h2 className="text-4xl  font-bold text-green-200 mb-4">What Our Members Say</h2>
            <p className="text-base text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-12 transition-colors duration-300">
                Thousands of members have found meaningful connections through HeartBridge. Here's what some of them have to say:
            </p>

            {/* Review Card */}
            <div className="relative max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors duration-300"
                    >
                        <img
                            src={currentReview.img}
                            alt={currentReview.name}
                            className="w-20 h-20 rounded-full mx-auto object-cover mb-4 border-2 border-pink-500"
                        />
                        <h3 className="text-xl font-semibold">{currentReview.name}</h3>
                        <p className="text-sm text-pink-500">{currentReview.role}</p>
                        <p className="mt-4 text-base text-gray-800 dark:text-gray-200 transition-colors duration-300">
                            “{currentReview.comment}”
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 px-4">
                    <button
                        onClick={handlePrev}
                        className="btn btn-circle btn-outline btn-sm md:btn-md text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-600 hover:border-pink-500 hover:text-pink-500 transition-colors duration-300"
                    >
                        ❮
                    </button>
                    <button
                        onClick={handleNext}
                        className="btn btn-circle btn-outline btn-sm md:btn-md text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-600 hover:border-pink-500 hover:text-pink-500 transition-colors duration-300"
                    >
                        ❯
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CustomerTestimonials;
