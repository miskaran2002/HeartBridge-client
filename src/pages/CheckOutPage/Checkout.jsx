import React from 'react';
import { useParams } from 'react-router';

import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise =loadStripe('pk_test_51M5zYzBb8q6z0XZJ9v8Z9ZS009Q1J9ZJZ')

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
                {/* Stripe Card Input */}
                <div>
                    <label className="block mb-1 font-medium">Card Details</label>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />

                    </Elements>
                    
                </div>


                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-[#4E1A3D] text-white rounded hover:bg-[#38102e]"
                    >
                        Pay & Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
