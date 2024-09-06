// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [userDetails, setUserDetails] = useState([]);
//     const [newUser, setUser] = useState(null);
//     const [items, setItems] = useState([]);

//     // Fetch items when the component mounts
//     useEffect(() => {
//         fetchItems();
//     }, []);

//     // Fetch items function
//     const fetchItems = useCallback(async () => {
//         try {
//             const response = await axios.get('http://localhost:1010/admin/get-users/1');
//             setItems(response.data);
//             console.log('Fetched items:', response.data);
//         } catch (error) {
//             console.error('Error fetching items:', error);
//         }
//     }, []);

//     // Function to add a user
//     const addUser = useCallback(async (item) => {
//         setUserDetails((prevItems) => {
//             const existingItem = prevItems.find((i) => i.id === item.id);
//             if (existingItem) {
//                 return prevItems.map((i) =>
//                     i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//                 );
//             }
//             return [...prevItems, { ...item, quantity: 1 }];
//         });
//     }, []);

//     // // Function to update the quantity of an item in the cart
//     // const updateQuantity = useCallback((id, quantity) => {
//     //     setCartItems((prevItems) =>
//     //         prevItems.map((item) =>
//     //             item.id === id ? { ...item, quantity } : item
//     //         )
//     //     );
//     // }, []);

//     // // Function to delete a user
//     // const removeFromCart = useCallback(async (id) => {
//     //     const itemToRemove = userDetails.find((item) => item.id === id);
//     //     if (itemToRemove) {
//     //         setUserDetails((prevItems) => prevItems.filter((item) => item.id !== id));
//     //     }
//     // }, [cartItems]);

//     // // Clear the cart
//     // const clearCart = useCallback(() => {
//     //     setUserDetails([]);
//     //     setUser(null);
//     // }, []);

//     // // Function to handle the checkout process
//     // const handleCheckout = useCallback(async () => {
//     //     try {
//     //         const requests = cartItems.map((item) =>
//     //             axios.post(`http://localhost:8082/item/reserve/${item.id}`, {
//     //                 quantity: item.quantity,
//     //             })
//     //         );
//     //         await Promise.all(requests);
//     //         clearCart();
//     //         alert('Checkout successful!');
//     //     } catch (error) {
//     //         alert('Checkout failed. Please try again later.');
//     //     }
//     // }, [cartItems, clearCart]);

//     return (
//         <UserContext.Provider
//             value={{
//                 userDetails,
//                 items,
//                 addUser,
//                 newUser,
//                 setUser,
//                 setItems,
//                 fetchItems,
//             }}
//         >
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useLogin = () => useContext(UserContext);