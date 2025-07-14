import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure'; // your custom axios hook
import Swal from 'sweetalert2';

const CheckoutForm = ({ biodataId, email }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    // 1. Fetch client secret from backend
    useEffect(() => {
        if (email) {
            axiosSecure.post('/create-payment-intent', { email })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Client secret error:', err);
                });
        }
    }, [email, axiosSecure]);

    const onSubmit = async (data) => {
        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
            return;
        }

        // Confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
            receipt_email: email, // optional
        });

        if (confirmError) {
            console.error('Payment confirmation error:', confirmError.message);
            setCardError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setCardError('');
            console.log('Payment successful:', paymentIntent);
            Swal.fire('✅ Success', 'Payment completed and contact request submitted!', 'success');
            // 🔁 Later: You can now save this request info to your DB (with status: 'pending')
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Biodata ID (readonly) */}
            <div>
                <label className="block mb-1 font-medium">Biodata ID</label>
                <input
                    type="text"
                    readOnly
                    defaultValue={biodataId}
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
                    defaultValue={email}
                    {...register('email')}
                    className="w-full border p-2 rounded bg-gray-100"
                />
            </div>

            {/* Stripe Card Input */}
            <div>
                <label className="block mb-1 font-medium">Card Details</label>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: {
                                color: '#fa755a',
                                iconColor: '#fa755a',
                            },
                        },
                    }}
                    className="border p-3 rounded bg-white"
                />
            </div>

            {cardError && <p className="text-red-600">{cardError}</p>}

            <button
                type="submit"
                disabled={!stripe || !clientSecret}
                className="w-full px-4 py-2 bg-[#4E1A3D] text-white rounded hover:bg-[#38102e]"
            >
                Pay & Submit Request for $5 USD
            </button>
        </form>
    );
};

export default CheckoutForm;
