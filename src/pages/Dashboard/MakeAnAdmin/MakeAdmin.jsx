import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const MakeAdmin = () => {
    const [searchEmail, setSearchEmail] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleSearch = async () => {
        if (!searchEmail) return Swal.fire('Enter an email first', '', 'warning');
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/users/${searchEmail}`);
            setUser(res.data);
        } catch (error) {
            setUser(null);
            Swal.fire('User not found', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/update-role/${searchEmail}`, {
                role: newRole,
            });

            if (res.data?.result?.modifiedCount > 0) {
                Swal.fire(`Role updated to ${newRole}`, '', 'success');
                const updatedUser = await axiosSecure.get(`/users/${searchEmail}`);
                setUser(updatedUser.data);
            } else {
                Swal.fire('No changes made', '', 'info');
            }
        } catch (err) {
            Swal.fire('Something went wrong', '', 'error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Admin Role Manager</h2>

            <div className="flex gap-3">
                <input
                    type="email"
                    placeholder="Search user by email"
                    className="input input-bordered w-full"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-primary px-6">
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            <AnimatePresence>
                {user && (
                    <motion.div
                        key="user-card"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="bg-gray-50 border rounded-lg p-5 shadow-sm"
                    >
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> <span className="capitalize">{user.role || 'user'}</span></p>
                            <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString() || 'N/A'}</p>
                        </div>

                        <div className="mt-4 flex gap-4">
                            {user.role === 'admin' ? (
                                <button
                                    onClick={() => handleRoleUpdate('user')}
                                    className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
                                >
                                    Remove Admin
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleRoleUpdate('admin')}
                                    className="btn bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Make Admin
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MakeAdmin;
