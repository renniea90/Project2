import { useState } from 'react';

const useCart = (initialItems = []) => {
  const [items, setItems] = useState(initialItems);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const itemIndex = items.findIndex(i => i.id === item.id);
    if (itemIndex !== -1 && items[itemIndex].quantity > 0) {
      const updatedItems = [...items];
      updatedItems[itemIndex].quantity -= 1;
      setItems(updatedItems);
  
      const cartIndex = cart.findIndex(i => i.id === item.id);
      if (cartIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[cartIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        const newCartItem = { ...item, quantity: 1 };
        setCart([...cart, newCartItem]);
      }
  
      console.log('Updated Cart:', cart); // Log the updated cart state
      console.log('Updated Items:', items); // Log the updated items state
    }
  };
  

  return {
    items,
    cart,
    setItems,
    setCart,
    addToCart,
  };
};

export default useCart;
