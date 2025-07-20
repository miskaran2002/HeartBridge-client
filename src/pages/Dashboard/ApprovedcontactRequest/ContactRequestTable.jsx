import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

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

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="overflow-x-auto mt-5">
            <h2 className="text-xl font-semibold mb-4">All Contact Requests</h2>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Biodata ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contactRequests.map((request, index) => (
                        <tr key={request._id}>
                            <td>{index + 1}</td>
                            <td>{request.name}</td>
                            <td>{request.email}</td>
                            <td>{request.biodataId}</td>
                            <td>{request.status}</td>
                            <td>
                                {request.status === 'pending' ? (
                                    <button
                                        onClick={() => approveRequest.mutate(request._id)}
                                        className="btn btn-sm btn-success"
                                    >
                                        Approve
                                    </button>
                                ) : (
                                    <span className="text-green-600 font-bold">Approved</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllContactRequests;
