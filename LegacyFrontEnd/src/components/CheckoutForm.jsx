import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      alert('Payment failed. Please try again.');
    } else {
      try {
        const response = await axios.post('http://localhost:8080/api/payment/charge', {}, {
          headers: {
            token: paymentMethod.id,
            amount: total * 100, // Stripe expects amount in the smallest currency unit (e.g., pence for GBP)
          },
        });
        if (response.status === 200) {
          alert('Payment Successful!');
        } else {
          alert('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Payment Error:', error);
        alert('Payment failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay £{total}
      </button>
    </form>
  );
};

export default CheckoutForm;
