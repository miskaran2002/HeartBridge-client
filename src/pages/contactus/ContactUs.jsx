import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "How can I create a profile?",
        answer: "You can create a profile by registering on our website and filling out your biodata information."
    },
    {
        question: "Is my personal information secure?",
        answer: "Yes, we take your privacy seriously and use encryption and security measures to protect your data."
    },
    {
        question: "How do I contact a potential match?",
        answer: "Once you find a suitable match, you can use the 'Contact' button on their profile to send a request."
    },
    {
        question: "What is the premium membership?",
        answer: "Premium membership gives you access to exclusive profiles and additional contact options."
    },
    {
        question: "How can I reset my password?",
        answer: "Use the 'Forgot Password' link on the login page to reset your password via email."
    }
];

const ContactUs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-orange-800 ">Contact Us</h1>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
                If you have any questions or need assistance, feel free to reach out to our support team.
                We're here to help you find your perfect match!
            </p>

            <h2 className="text-2xl font-semibold mb-3 text-orange-800 ">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map(({ question, answer }, idx) => (
                    <div
                        key={idx}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
                    >
                        <button
                            onClick={() => toggleFAQ(idx)}
                            className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition"
                            aria-expanded={openIndex === idx}
                            aria-controls={`faq-answer-${idx}`}
                        >
                            <span className="font-medium text-lg text-gray-900 dark:text-gray-100">{question}</span>
                            <motion.span
                                animate={{ rotate: openIndex === idx ? 45 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-2xl font-bold select-none text-gray-900 dark:text-gray-100"
                            >
                                +
                            </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openIndex === idx && (
                                <motion.div
                                    key="content"
                                    id={`faq-answer-${idx}`}
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                        open: { opacity: 1, height: 'auto', marginTop: 0 },
                                        collapsed: { opacity: 0, height: 0, marginTop: -10 }
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="px-4 pb-4 overflow-hidden text-gray-700 dark:text-gray-300"
                                >
                                    {answer}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactUs;
