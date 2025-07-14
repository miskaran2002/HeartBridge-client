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
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="mb-6 text-gray-700">
                If you have any questions or need assistance, feel free to reach out to our support team.
                We're here to help you find your perfect match!
            </p>

            <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
            <div>
                {faqs.map(({ question, answer }, idx) => (
                    <div key={idx} className="mb-4 border rounded-md shadow-sm">
                        <button
                            onClick={() => toggleFAQ(idx)}
                            className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                            aria-expanded={openIndex === idx}
                            aria-controls={`faq-answer-${idx}`}
                        >
                            <span className="font-medium text-lg">{question}</span>
                            <motion.span
                                animate={{ rotate: openIndex === idx ? 45 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-2xl font-bold select-none"
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
                                    className="px-4 pb-4 overflow-hidden text-gray-600"
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
