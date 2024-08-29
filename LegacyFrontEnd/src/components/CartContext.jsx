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
        try {
            const response = await axios.post(`http://localhost:8082/item/reserve/${item.id}`, {
                quantity: 1
            });
            if (response.status === 200) {
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
                alert('This item is out of stock!');
            }
        } catch (error) {
            alert('Failed to add item to cart. Please try again later.');
        }
    }, []);

    // Function to remove an item from the cart
    const removeFromCart = useCallback(async (id) => {
        try {
            const itemToRemove = cartItems.find((item) => item.id === id);
            if (itemToRemove) {
                await axios.post(`http://localhost:8082/item/release/${id}`, {
                    quantity: itemToRemove.quantity
                });
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
                setItems((prevItems) =>
                    prevItems.map((i) =>
                        i.id === id ? { ...i, quantity: i.quantity + itemToRemove.quantity } : i
                    )
                );
            }
        } catch (error) {
            alert('Failed to remove item from cart. Please try again later.');
        }
    }, [cartItems]);

    // Clear the cart
    const clearCart = useCallback(() => {
        setCartItems([]);
        setNewCart(null);
    }, []);

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
                setItems,
                fetchItems, // Make sure fetchItems is exposed here
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
