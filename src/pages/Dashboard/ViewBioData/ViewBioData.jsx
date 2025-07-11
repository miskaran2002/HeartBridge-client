import React from 'react';
import { useQuery } from '@tanstack/react-query';


import { motion } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ViewBioData = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: biodata, isLoading } = useQuery({
        queryKey: ['myBiodata', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/${user.email}`);
            return res.data?.data;
        },
        enabled: !!user?.email
    });

    const handleMakePremium = async () => {
        try {
            const res = await axiosSecure.patch(`/biodata/premium/${biodata._id}`);
            if (res.data.modifiedCount > 0) {
                alert('✅ Biodata upgraded to premium!');
            }
        } catch (err) {
            console.error('Make premium error:', err);
            alert('❌ Failed to make premium');
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading your biodata...</p>;

    if (!biodata) return <p className="text-center mt-10 text-red-600">No biodata found for your account.</p>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Your Biodata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                    src={biodata.image || 'https://i.ibb.co/2n7Vj1J/default-avatar.png'}
                    alt={biodata.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto md:col-span-2"
                />
                <p><strong>Biodata Type:</strong> {biodata.biodataType}</p>
                <p><strong>Name:</strong> {biodata.name}</p>
                <p><strong>Date of Birth:</strong> {biodata.dob}</p>
                <p><strong>Height:</strong> {biodata.height}</p>
                <p><strong>Weight:</strong> {biodata.weight}</p>
                <p><strong>Age:</strong> {biodata.age}</p>
                <p><strong>Occupation:</strong> {biodata.occupation}</p>
                <p><strong>Race:</strong> {biodata.race}</p>
                <p><strong>Father's Name:</strong> {biodata.fatherName}</p>
                <p><strong>Mother's Name:</strong> {biodata.motherName}</p>
                <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
                <p><strong>Present Division:</strong> {biodata.presentDivision}</p>
                <p><strong>Expected Partner Age:</strong> {biodata.expectedAge}</p>
                <p><strong>Expected Partner Height:</strong> {biodata.expectedHeight}</p>
                <p><strong>Expected Partner Weight:</strong> {biodata.expectedWeight}</p>
                <p><strong>Email:</strong> {biodata.email}</p>
                <p><strong>Mobile:</strong> {biodata.mobile}</p>
            </div>

            {!biodata.isPremium && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleMakePremium}
                        className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
                    >
                        Make Biodata Premium
                    </button>
                </div>
            )}

            {biodata.isPremium && (
                <p className="text-green-600 font-semibold text-center mt-6">Your biodata is already Premium ✅</p>
            )}
        </motion.div>
    );
};

export default ViewBioData;