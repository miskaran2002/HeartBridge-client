import React from 'react';
import { useParams } from 'react-router';

import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const Checkout = () => {
    const { biodataId } = useParams(); // get biodataId from URL
    const { user } = useAuth(); // get logged-in user
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log('Form data:', data);
        // We’ll handle Stripe & backend submission later
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 shadow rounded mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Contact Info Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Biodata ID (readonly) */}
                <div>
                    <label className="block mb-1 font-medium">Biodata ID</label>
                    <input
                        type="text"
                        readOnly
                        value={biodataId}
                        {...register('biodataId')}
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>

                {/* User Email (readonly) */}
                <div>
                    <label className="block mb-1 font-medium">Your Email</label>
                    <input
                        type="email"
                        readOnly
                        value={user?.email || ''}
                        {...register('email')}
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>

                {/* Stripe Card Input (placeholder for now) */}
                <div>
                    <label className="block mb-1 font-medium">Card Details</label>
                    <div className="w-full border p-4 rounded bg-gray-50 text-center text-gray-500">
                        Stripe Card Input (Coming Soon)
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Pay & Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
