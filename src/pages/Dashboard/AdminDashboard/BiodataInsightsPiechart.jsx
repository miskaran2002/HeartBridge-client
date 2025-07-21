import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F'];

const BiodataInsightsPieChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['biodataInsights'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/biodata-insights');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
    if (isError || !data?.success) return <p className="text-center text-red-600">Failed to load data.</p>;

    const pieData = [
        { name: 'Total Biodata', value: data.totalBiodata },
        { name: 'Male Biodata', value: data.maleBiodata },
        { name: 'Female Biodata', value: data.femaleBiodata },
        { name: 'Premium Biodata', value: data.premiumBiodata },
        { name: 'Total Revenue ($)', value: data.totalRevenue }
    ];

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-center mb-4">Biodata Insights</h2>
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
    );
};

export default BiodataInsightsPieChart;
