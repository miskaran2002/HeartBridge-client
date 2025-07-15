import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyFavourites = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: favourites = [], refetch } = useQuery({
        queryKey: ['favourites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favourites?email=${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This biodata will be removed from your favourites!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/favourites/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire('Deleted!', 'Biodata removed from favourites.', 'success');
                refetch();
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to delete', 'error');
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">My Favourites</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-300 text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3 border">Name</th>
                            <th className="px-6 py-3 border">Biodata ID</th>
                            <th className="px-6 py-3 border">Permanent Address</th>
                            <th className="px-6 py-3 border">Occupation</th>
                            <th className="px-6 py-3 border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-sm">
                        {favourites.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition-all">
                                <td className="px-6 py-3 border font-medium">{item.name || 'N/A'}</td>
                                <td className="px-6 py-3 border">{item.biodataId}</td>
                                <td className="px-6 py-3 border">{item.permanentDivision}</td>
                                <td className="px-6 py-3 border">{item.occupation}</td>
                                <td className="px-6 py-3 border text-center">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-600 hover:underline hover:text-red-800 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {favourites.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-6">
                                    No favourite biodata found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFavourites;
