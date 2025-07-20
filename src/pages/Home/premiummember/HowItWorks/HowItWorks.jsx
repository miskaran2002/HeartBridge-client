import { motion } from "framer-motion";
import { FaUserPlus, FaHeart, FaCrown, FaHandshake } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserPlus className="text-3xl text-indigo-600" />,
            title: "1. Register & Create Biodata",
            description: "Sign up and fill in your personal details, preferences, and upload your photo to get started."
        },
        {
            icon: <FaHeart className="text-3xl text-pink-600" />,
            title: "2. Browse & Express Interest",
            description: "Explore thousands of biodatas and express interest in the ones that match your preferences."
        },
        {
            icon: <FaCrown className="text-3xl text-yellow-500" />,
            title: "3. Get Premium Access",
            description: "Upgrade to Premium to view contact details and unlock unlimited biodata views."
        },
        {
            icon: <FaHandshake className="text-3xl text-green-600" />,
            title: "4. Connect & Start a Journey",
            description: "Contact your preferred matches, chat, and take the next step toward marriage."
        }
    ];

    return (
        <section className="my-20 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-lg p-6 text-center border"
                    >
                        <div className="mb-4 flex justify-center">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
