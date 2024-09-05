import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [newCart, setNewCart] = useState(null);
    const [items, setItems] = useState([]);

    // Fetch items when the component mounts
    useEffect(() => {
        fetchItems();
    }, []);

    // Fetch items function
    const fetchItems = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8082/item/getAll');
            setItems(response.data);
            console.log('Fetched items:', response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }, []);

    // Function to add an item to the cart
    const addToCart = useCallback(async (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    }, []);

    // Function to update the quantity of an item in the cart
    const updateQuantity = useCallback((id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, []);

    // Function to remove an item from the cart
    const removeFromCart = useCallback(async (id) => {
        const itemToRemove = cartItems.find((item) => item.id === id);
        if (itemToRemove) {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        }
    }, [cartItems]);

    // Clear the cart
    const clearCart = useCallback(() => {
        setCartItems([]);
        setNewCart(null);
    }, []);

    // Function to handle the checkout process
    const handleCheckout = useCallback(async () => {
        try {
            const requests = cartItems.map((item) =>
                axios.post(`http://localhost:8082/item/reserve/${item.id}`, {
                    quantity: item.quantity,
                })
            );
            await Promise.all(requests);
            clearCart();
            alert('Checkout successful!');
        } catch (error) {
            alert('Checkout failed. We will be in touch shortly.');
        }
    }, [cartItems, clearCart]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                items,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                newCart,
                setNewCart,
                setItems,
                fetchItems,
                handleCheckout, // Expose handleCheckout for the Checkout button
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
