import React from 'react';
import { useCart } from './CartContext';  
import '../CSS/Cart.css';  
const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart(); // Use necessary cart context methods

  // Calculate total price of items in cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Calculate service charge (7.25%)
  const calculateServiceCharge = (total) => {
    return (total * 0.0725).toFixed(2);
  };

  const total = parseFloat(calculateTotal());
  const serviceCharge = calculateServiceCharge(total);
  const grandTotal = (parseFloat(total) + parseFloat(serviceCharge)).toFixed(2);

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
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
              <td>{item.name}</td>
              <td>£{item.price.toFixed(2)}</td>
              <td>
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                >
                  {Array.from({ length: item.quantity + 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </td>
              <td>£{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Subtotal</td>
            <td>£{total}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="3">Service Charge (7.25%)</td>
            <td>£{serviceCharge}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="3">Total</td>
            <td>£{grandTotal}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className="cart-actions">
        <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
        <button onClick={() => alert('Proceeding to Checkout')} className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
