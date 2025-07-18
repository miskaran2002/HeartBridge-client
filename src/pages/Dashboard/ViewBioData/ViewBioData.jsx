import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

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
        enabled: !!user?.email,
    });

    const handleRequestPremium = async () => {
        console.log("Make Premium button clicked"); // Debug log

        if (!biodata?._id) {
            Swal.fire('Error', 'Biodata ID not found.', 'error');
            return;
        }

        try {
            const res = await axiosSecure.patch(`/biodata/request-premium/${biodata._id}`);
            console.log("Response from server:", res.data);

            if (res.data?.modifiedCount > 0) {
                Swal.fire(
                    'Requested!',
                    'Your biodata has been requested for premium approval.',
                    'success'
                );
            } else {
                Swal.fire(
                    'No Change',
                    'Your biodata is already requested or no changes made.',
                    'info'
                );
            }
        } catch (err) {
            console.error("Error while requesting premium:", err);
            Swal.fire('Error', 'Something went wrong while requesting.', 'error');
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10 text-blue-600">Loading your biodata...</p>;
    }

    if (!biodata) {
        return <p className="text-center mt-10 text-red-600">No biodata found for your account.</p>;
    }

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
                    src={biodata?.image || 'https://i.ibb.co/2n7Vj1J/default-avatar.png'}
                    alt={biodata?.name || 'User Avatar'}
                    className="w-48 h-48 object-cover rounded-full mx-auto md:col-span-2"
                />

                <p><strong>Biodata Type:</strong> {biodata?.biodataType || 'N/A'}</p>
                <p><strong>Name:</strong> {biodata?.name || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {biodata?.dob || 'N/A'}</p>
                <p><strong>Height:</strong> {biodata?.height || 'N/A'}</p>
                <p><strong>Weight:</strong> {biodata?.weight || 'N/A'}</p>
                <p><strong>Age:</strong> {biodata?.age || 'N/A'}</p>
                <p><strong>Occupation:</strong> {biodata?.occupation || 'N/A'}</p>
                <p><strong>Race:</strong> {biodata?.race || 'N/A'}</p>
                <p><strong>Father's Name:</strong> {biodata?.fatherName || 'N/A'}</p>
                <p><strong>Mother's Name:</strong> {biodata?.motherName || 'N/A'}</p>
                <p><strong>Permanent Division:</strong> {biodata?.permanentDivision || 'N/A'}</p>
                <p><strong>Present Division:</strong> {biodata?.presentDivision || 'N/A'}</p>
                <p><strong>Expected Partner Age:</strong> {biodata?.expectedAge || 'N/A'}</p>
                <p><strong>Expected Partner Height:</strong> {biodata?.expectedHeight || 'N/A'}</p>
                <p><strong>Expected Partner Weight:</strong> {biodata?.expectedWeight || 'N/A'}</p>
                <p><strong>Email:</strong> {biodata?.email || 'N/A'}</p>
                <p><strong>Mobile:</strong> {biodata?.mobile || 'N/A'}</p>
            </div>

            {!biodata?.isPremium && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleRequestPremium}
                        className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition duration-200"
                    >
                        Make Biodata Premium
                    </button>
                </div>
            )}

            {biodata?.isPremium && (
                <p className="text-green-600 font-semibold text-center mt-6">
                    Your biodata is already Premium ✅
                </p>
            )}
        </motion.div>
    );
};

export default ViewBioData;
