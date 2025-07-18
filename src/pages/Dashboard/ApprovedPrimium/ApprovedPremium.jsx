import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();

    // Load premium approval requests
    const { data: premiumRequests = [], refetch } = useQuery({
        queryKey: ['premiumRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premium-requested-biodatas');
            return res.data;
        },
    });

    // Handle make premium
    const handleMakePremium = async (biodataId) => {
        try {
            const res = await axiosSecure.patch(`/biodata/${biodataId}/make-premium`);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Biodata marked as premium.',
                });
                refetch();
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No Change',
                    text: 'This biodata is already premium.',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong.',
            });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Premium Approval Requests</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Biodata ID</th>
                            <th className="py-2 px-4 border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {premiumRequests.length > 0 ? (
                            premiumRequests.map((request, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border">{request.name}</td>
                                    <td className="py-2 px-4 border">{request.email}</td>
                                    <td className="py-2 px-4 border">{request.biodataId}</td>
                                    <td className="py-2 px-4 border text-center">
                                        <button
                                            onClick={() => handleMakePremium(request.biodataId)}
                                            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                                        >
                                            Make Premium
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No premium requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedPremium;
