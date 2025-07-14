// Checkout.jsx
import React from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51M5zYzBb8q6z0XZJ9v8Z9ZS009Q1J9ZJZ');

const Checkout = () => {
    const { biodataId } = useParams();
    const { user } = useAuth();

    return (
        <div className="max-w-lg mx-auto bg-white p-6 shadow rounded mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Contact Info Request</h2>

            <Elements stripe={stripePromise}>
                <CheckoutForm biodataId={biodataId} email={user?.email} />
            </Elements>
        </div>
    );
};

export default Checkout;
