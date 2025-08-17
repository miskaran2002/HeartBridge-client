// src/pages/Home/Home/Calltoaction/CallToAction.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const CallToAction = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
            <div className="max-w-6xl mx-auto text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-bold text-white dark:text-gray-200"
                >
                    Find Your Perfect Match Today 💖
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-4 text-lg md:text-xl text-gray-100 dark:text-gray-400"
                >
                    Join thousands of happy couples who found their soulmate on HeartBridge.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate("/biodatas")}
                    className="mt-8 px-8 py-4 bg-white text-pink-600 font-semibold text-lg rounded-2xl shadow-lg hover:bg-pink-50 dark:bg-pink-600 dark:text-white dark:hover:bg-pink-700"
                >
                    Get Started
                </motion.button>
            </div>
        </section>
    );
};

export default CallToAction;
