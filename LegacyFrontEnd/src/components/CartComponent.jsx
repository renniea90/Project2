import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert'; // Assuming this is the alert component you want to use
import '../CSS/Cart.css'; // Assuming this is your combined CSS file

const Cart = ({ cart, setCart, items, setItems, cartId }) => { // Assuming cartId is passed as a prop
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [itemMap, setItemMap] = useState({}); // Define itemMap state

  useEffect(() => {
    const map = items.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setItemMap(map);
  }, [items]);

  const updateQuantity = (item, delta) => {
    const cartIndex = cart.findIndex(i => i.id === item.id);
    const itemIndex = items.findIndex(i => i.id === item.id);

    if (cartIndex !== -1) {
      const updatedCart = [...cart];
      const updatedItems = [...items];
      const cartItem = updatedCart[cartIndex];

      if (delta === -1 && cartItem.quantity === 1) {
        updatedCart.splice(cartIndex, 1);
      } else {
        cartItem.quantity += delta;
      }

      if (itemIndex !== -1) {
        updatedItems[itemIndex].quantity -= delta;
        if (updatedItems[itemIndex].quantity < 0) {
          updatedItems[itemIndex].quantity = 0;
        }
      }

      if (updatedItems[itemIndex] && updatedItems[itemIndex].quantity === 0) {
        updatedItems.splice(itemIndex, 1);
      }

      setCart(updatedCart);
      setItems(updatedItems);
    }
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    // No API call here; only update the state.
  };

  const handleSaveCart = async () => {
    try {
      const response = await axios.post('http://localhost:8083/cart/add', cart, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        const orderId = response.data;
        setAlertMessage(`Cart successfully saved. Your order ID is ${orderId}.`);
      } else {
        setAlertMessage('Failed to save cart.');
      }
      setShowAlert(true);
    } catch (error) {
      console.error('Error saving cart:', error);
      setAlertMessage('Failed to save cart.');
      setShowAlert(true);
    }
  };

  const handleCheckout = async () => {
    const payload = {
      items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
      status: "active"  // Adjust this based on your use case
    };

    try {
      // Update the cart
      await axios.patch(`http://localhost:8083/cart/update/${cartId}`, payload);

      // Update the items
      for (const item of cart) {
        await axios.patch(`http://localhost:8082/item/update/${item.id}`, {
          quantity: itemMap[item.id] - item.quantity
        });
      }

      setAlertMessage('Checkout complete!');
      setCart([]);
      setItems([]);
    } catch (error) {
      console.error('Error during checkout:', error.response ? error.response.data : error.message);
      setAlertMessage('An error occurred during checkout. Please try again.');
    }
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  const serviceCharge = (totalPrice * 0.0725).toFixed(2);
  const grandTotal = (parseFloat(totalPrice) + parseFloat(serviceCharge)).toFixed(2);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table>
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
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>£{item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>£{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => updateQuantity(item, -1)}>-</button>
                <button onClick={() => updateQuantity(item, 1)}>+</button>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Subtotal</td>
            <td>£{totalPrice}</td>
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
      <div className="button-container">
        <button className="save-cart-btn" onClick={handleSaveCart}>Save Cart</button>
        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
      </div>
      {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};

export default Cart;
