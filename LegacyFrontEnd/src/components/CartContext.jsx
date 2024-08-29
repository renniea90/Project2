import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [newCart, setNewCart] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8082/item/getAll');
            setItems(response.data);
            console.log('Fetched items:', response.data);  // Add logging to verify data fetching
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const addToCart = async (item) => {
        try {
            console.log('Attempting to reserve item:', item);
            const response = await axios.post(`http://localhost:8082/item/reserve/${item.id}`, {
                quantity: 1  // Sending as an object with the quantity field
            });
    
            if (response.status === 200) {
                console.log('Item reserved successfully:', response.data);
    
                setCartItems((prevItems) => {
                    const existingItem = prevItems.find((i) => i.id === item.id);
                    if (existingItem) {
                        return prevItems.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        );
                    }
                    return [...prevItems, { ...item, quantity: 1 }];
                });
    
                setItems((prevItems) =>
                    prevItems.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
                    )
                );
            } else {
                console.log('Failed to reserve item:', response.data);
                alert('This item is out of stock!');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
            alert('Failed to add item to cart. Please try again later.');
        }
    };

    const removeFromCart = async (id) => {
        try {
            const itemToRemove = cartItems.find((item) => item.id === id);
            if (itemToRemove) {
                console.log('Attempting to release stock for item:', itemToRemove);
                await axios.post(`http://localhost:8082/item/release/${id}`, {
                    quantity: itemToRemove.quantity
                });
                console.log('Item stock released successfully');

                setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
                setItems((prevItems) =>
                    prevItems.map((i) =>
                        i.id === id ? { ...i, quantity: i.quantity + itemToRemove.quantity } : i
                    )
                );
            }
        } catch (error) {
            console.error('Error removing item from cart:', error.response ? error.response.data : error.message);
            alert('Failed to remove item from cart. Please try again later.');
        }
    };

    const clearCart = () => {
        setCartItems([]);
        setNewCart(null);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                items,
                addToCart,
                removeFromCart,
                clearCart,
                newCart,
                setNewCart,
                setCartItems,
                fetchItems,  // Ensure fetchItems is exposed to trigger re-fetch
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
