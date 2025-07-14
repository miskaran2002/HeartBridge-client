// components/CheckoutForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (event) => {
        
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('[error]', error);
        }
        else {
            console.log('[PaymentMethod]', paymentMethod);
        }

    }
    return (
        <div className="w-full border p-4 rounded bg-gray-50 text-center text-gray-500">
           <form onSubmit={handleSubmit}>
            <CardElement>
                <button type='submit'disabled={!stripe}>
                    pay for need information
                </button>
            </CardElement>

           </form>
        </div>
    );
};

export default CheckoutForm;
