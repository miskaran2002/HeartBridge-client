import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckoutForm = ({ biodataId, email }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    // 1. Get client secret from backend
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

        // 2. Create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
            return;
        }

        // 3. Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
            receipt_email: email,
        });

        if (confirmError) {
            setCardError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setCardError('');
            console.log('✅ Payment successful:', paymentIntent);

            // 4. Save contact request to database
            try {
                const contactRequest = {
                    name: data.name,              // Optional — set if available
                    email: data.email,
                    biodataId: data.biodataId,
                    mobile: '',            // Leave blank, will be filled after approval
                    contactEmail: '',      // Leave blank, will be filled after approval
                };

                const res = await axiosSecure.post('/contact-requests', contactRequest);

                if (res.data.insertedId) {
                    Swal.fire('✅ Success', 'Payment done and contact request submitted!', 'success');
                } else {
                    Swal.fire('⚠️ Warning', 'Payment successful, but request failed to save.', 'warning');
                }
            } catch (err) {
                console.error('❌ Error saving contact request:', err);
                Swal.fire('❌ Error', 'Payment done, but failed to save contact request.', 'error');
            }
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

            {/* Email (readonly) */}
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

            {/* Error Message */}
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
