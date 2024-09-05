import React from 'react';
import { useCart } from './CartContext';
import StripeCheckout from 'react-stripe-checkout'; // Import StripeCheckout correctly
import '../CSS/Cart.css';
import axios from 'axios';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, items, handleCheckout } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateServiceCharge = (total) => {
    return (total * 0.0725).toFixed(2);
  };

  const total = parseFloat(calculateTotal());
  const serviceCharge = calculateServiceCharge(total);
  const grandTotal = (parseFloat(total) + parseFloat(serviceCharge)).toFixed(2);

  const handleIncrease = (id) => {
    const item = cartItems.find((item) => item.id === id);
    const itemInStock = items.find((i) => i.id === id);

    if (item && itemInStock && item.quantity < itemInStock.quantity) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleToken = async (token) => {
    try {
        const response = await axios.post('http://localhost:8084/api/payment/charge', null, {
            headers: {
                token: "tok_visa", // Using the Stripe test token
                amount: grandTotal, // Convert amount to the smallest unit (pence for GBP)
            },
        });
        console.log(response);
        if (response.status === 200) {
            alert('Payment sjdfkasdfk!');
            handleCheckout(); // Proceed with checkout logic
        }
    } catch (error) {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
    }
};

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
          <th>Image</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>{item.name}</td>
              <td>£{item.price.toFixed(2)}</td>
              <td>
                <button className="minusButton" onClick={() => handleDecrease(item.id)}>-</button>
                <span className="quantity">{item.quantity}</span>
                <button className="minusButton" onClick={() => handleIncrease(item.id)}>+</button>
              </td>
              <td>£{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}><i>Remove</i></button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Subtotal</td>
            <td>£{total.toFixed(2)}</td> {/* Ensure two decimal places */}
            <td></td>
          </tr>
          <tr>
            <td colSpan="4">Service Charge (7.25%)</td>
            <td>£{serviceCharge}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4">Total</td>
            <td>£{grandTotal}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className="cart-actions">
        <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
        <StripeCheckout
          stripeKey="pk_test_51PuYbP1u1GNBLV0cpcFYmhDa2G8m5MtRd4V221Ww9LDWOkJMKQKIQ7t8kf4BO6RErEI6r5ka6LDK3QQgyA4abVVG00lrEBdXzP" // Replace with your actual Stripe publishable key
          token={handleToken}
          amount={grandTotal * 100} // amount in cents
          currency="GBP"
          name="Your Shop Name"
          billingAddress
          shippingAddress
        >
          <button className="checkout-btn">Checkout</button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default Cart;
