import React from 'react';
import '../CSS/Cart.css';
import { useCart } from './CartContext';
import CheckoutButton from './CheckoutButton';

const CartComponent = ({ cart }) => {
  // Guard against undefined cart
  const cartItems = Array.isArray(cart) ? cart : [];

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  const serviceCharge = (totalPrice * 0.0725).toFixed(2);
  const grandTotal = (parseFloat(totalPrice) + parseFloat(serviceCharge)).toFixed(2);

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>£{item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>£{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Subtotal</td>
            <td>£{totalPrice}</td>
          </tr>
          <tr>
            <td colSpan="3">Service Charge (7.25%)</td>
            <td>£{serviceCharge}</td>
          </tr>
          <tr>
            <td colSpan="3">Total</td>
            <td>£{grandTotal}</td>
          </tr>
        </tfoot>
      </table>
      <CheckoutButton />
    </div>
  );
};

export default CartComponent;
