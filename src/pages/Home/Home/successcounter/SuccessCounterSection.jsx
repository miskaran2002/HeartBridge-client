import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';
import { FaUser, FaVenus, FaMars, FaHeart } from 'react-icons/fa';

const SuccessCounterSection = () => {
    const [stats, setStats] = useState({
        totalBiodata: 0,
        totalMale: 0,
        totalFemale: 0,
        totalMarriages: 0
    });

    useEffect(() => {
        axios.get('/biodata-stats') // adjust base URL if needed
            .then(res => setStats(res.data))
            .catch(err => console.error('Failed to fetch biodata stats:', err));
    }, []);

    const counters = [
        {
            icon: <FaUser className="text-4xl text-blue-500 mb-2" />,
            label: 'Total Biodatas',
            value: stats.totalBiodata
        },
        {
            icon: <FaMars className="text-4xl text-green-500 mb-2" />,
            label: 'Male Biodatas',
            value: stats.totalMale
        },
        {
            icon: <FaVenus className="text-4xl text-pink-500 mb-2" />,
            label: 'Female Biodatas',
            value: stats.totalFemale
        },
        {
            icon: <FaHeart className="text-4xl text-red-500 mb-2" />,
            label: 'Marriages Completed',
            value: stats.totalMarriages
        }
    ];

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">Success Counter</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {counters.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
                        >
                            {item.icon}
                            <h3 className="text-2xl font-semibold text-gray-800">
                                <CountUp end={item.value} duration={2} />
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessCounterSection;
