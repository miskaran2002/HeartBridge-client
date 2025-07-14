import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyContactRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['contactRequests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contact-requests?email=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this request?');
        if (!confirm) return;

        try {
            const res = await axiosSecure.delete(`/contact-requests/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire('Deleted!', 'Your request has been removed.', 'success');
                refetch();
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">My Contact Requests</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-left">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Biodata ID</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Mobile No</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td className="px-4 py-2 border">{req.name || 'N/A'}</td>
                                <td className="px-4 py-2 border">{req.biodataId}</td>
                                <td className="px-4 py-2 border">
                                    <span className={req.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border">
                                    {req.status === 'approved' ? req.mobile || 'N/A' : 'Hidden'}
                                </td>
                                <td className="px-4 py-2 border">
                                    {req.status === 'approved' ? req.contactEmail || 'N/A' : 'Hidden'}
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleDelete(req._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No contact requests yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyContactRequest;
