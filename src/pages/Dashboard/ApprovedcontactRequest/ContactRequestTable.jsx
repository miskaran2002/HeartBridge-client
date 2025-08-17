import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../shared/Navbar/Loading/LoadingSpinner';

const AllContactRequests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: contactRequests = [], isLoading } = useQuery({
        queryKey: ['contactRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contact-requests');
            return res.data;
        }
    });

    const approveRequest = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.patch(`/contact-requests/${id}`, { status: 'approved' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['contactRequests']);
            Swal.fire('Approved!', 'The contact request has been approved.', 'success');
        }
    });

    const handleApproveClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to approve this contact request?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                approveRequest.mutate(id);
            }
        });
    };

    if (isLoading) return <p className="text-center py-10"><LoadingSpinner></LoadingSpinner></p>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto mt-10 max-w-6xl mx-auto p-4  shadow-md rounded-xl"
        >
            <h2 className="text-2xl font-semibold mb-6 text-center">All Contact Requests</h2>
            <table className="table w-full text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left text-gray-700">
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Biodata ID</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contactRequests.map((request, index) => (
                        <tr key={request._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">{request.name || 'Unknown'}</td>
                            <td className="py-3 px-4">{request.email}</td>
                            <td className="py-3 px-4">{request.biodataId}</td>
                            <td className="py-3 px-4">
                                {request.status === 'approved' ? (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Approved
                                    </span>
                                ) : (
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Pending
                                    </span>
                                )}
                            </td>
                            <td className="py-3 px-4">
                                {request.status === 'pending' ? (
                                    <button
                                        onClick={() => handleApproveClick(request._id)}
                                        className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                                    >
                                        Approve
                                    </button>
                                ) : (
                                    <span className="text-green-600 font-semibold">✔ Approved</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default AllContactRequests;
