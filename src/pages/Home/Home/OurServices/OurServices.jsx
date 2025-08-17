// src/pages/Home/Home/Services/Services.jsx
import { FaHeart, FaUsers, FaCrown } from "react-icons/fa";

const Services = () => {
    const services = [
        {
            icon: <FaHeart className="text-5xl text-pink-500" />,
            title: "Matchmaking",
            description: "We connect compatible individuals for meaningful relationships."
        },
        {
            icon: <FaUsers className="text-5xl text-blue-500" />,
            title: "Community Support",
            description: "Join a safe and supportive community with real-time guidance."
        },
        {
            icon: <FaCrown className="text-5xl text-yellow-400" />,
            title: "Premium Membership",
            description: "Unlock exclusive features and priority matchmaking services."
        },
    ];

    return (
        <section className="py-16 bg-base-200 dark:bg-gray-950 transition-colors duration-300">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-extrabold  mb-12">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-pink-500/30 hover:scale-105 transform transition duration-300"
                        >
                            <div className="card-body items-center text-center">
                                {service.icon}
                                <h3 className="card-title mt-4 text-gray-900 dark:text-pink-200">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
