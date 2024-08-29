import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext';

function CheckoutButton() {
    const { cartItems, clearCart, fetchItems } = useCart(); // Added fetchItems to refresh the items after checkout
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCheckout = async () => {
        try {
            // Assuming the backend handles the reduction in stock levels upon checkout
            const response = await axios.post('http://localhost:8083/cart/checkout', cartItems);

            if (response.status === 200) {
                setAlertMessage('Checkout complete!');
                clearCart(); // Clear the cart after successful checkout
                fetchItems(); // Refresh items after checkout to reflect updated stock levels
            } else {
                setAlertMessage('Some items are out of stock. Please review your cart.');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            setAlertMessage('An error occurred during checkout. Please try again.');
        }
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
}

export default CheckoutButton;
