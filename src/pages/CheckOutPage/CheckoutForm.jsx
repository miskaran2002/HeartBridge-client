// CheckoutForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutForm = ({ biodataId, email }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { register, handleSubmit } = useForm();
    const [cardError, setCardError] = useState('');

    const onSubmit = async (data) => {
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.error('[Stripe error]', error);
            setCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('');
            console.log('Form data:', data); // biodataId + email
            // Later: Send to backend
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
                disabled={!stripe}
                className="w-full px-4 py-2 bg-[#4E1A3D] text-white rounded hover:bg-[#38102e]"
            >
                Pay & Submit Request
            </button>
        </form>
    );
};

export default CheckoutForm;
