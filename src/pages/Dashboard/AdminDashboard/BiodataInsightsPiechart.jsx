import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F'];

const OverviewPage = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['biodataInsights'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/biodata-insights');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center text-gray-600 mt-20">Loading...</p>;
    if (isError || !data?.success) return <p className="text-center text-red-600 mt-20">Failed to load data.</p>;

    const pieData = [
        { name: 'Total Biodata', value: data.totalBiodata },
        { name: 'Male Biodata', value: data.maleBiodata },
        { name: 'Female Biodata', value: data.femaleBiodata },
        { name: 'Premium Biodata', value: data.premiumBiodata },
        { name: 'Total Revenue ($)', value: data.totalRevenue }
    ];

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
                Dashboard Overview
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Total Biodata</h2>
                    <p className="text-2xl font-bold text-pink-500">{data.totalBiodata}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Premium Members</h2>
                    <p className="text-2xl font-bold text-green-500">{data.premiumBiodata}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Total Revenue ($)</h2>
                    <p className="text-2xl font-bold text-blue-500">{data.totalRevenue}</p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow transition-colors duration-300">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Biodata Insights</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={140}
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Optional: Additional Graphs/Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-300">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Gender Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Male', value: data.maleBiodata },
                                    { name: 'Female', value: data.femaleBiodata }
                                ]}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                <Cell fill="#8884d8" />
                                <Cell fill="#82ca9d" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Add more charts or graphical elements here */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-300">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Revenue Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Premium Revenue', value: data.premiumBiodata * 10 }, // Example
                                    { name: 'Regular Revenue', value: (data.totalBiodata - data.premiumBiodata) * 5 } // Example
                                ]}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                <Cell fill="#ff7f50" />
                                <Cell fill="#ffc658" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;
