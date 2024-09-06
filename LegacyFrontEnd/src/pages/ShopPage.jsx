import React from 'react';
import ItemCard2 from '../components/ItemCard2';
import Cart from '../components/Cart';
import '../CSS/ShopPage.css';
import { useCart } from '../components/CartContext';
import useStore from '../store/store';

const ShopPage = () => {
    const { items, cartItems, addToCart } = useCart();

    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const isAdmin = useStore((state) => state.isAdmin);
    const email = useStore((state) => state.email);

      
    console.log('shop Render - Email:', email);
    console.log('shop Render - IsAuthenticated:', isAuthenticated);
    console.log('shop Render - IsAdmin:', isAdmin);
    return (
        <div className="main-container">
            <div className="cart-container card">
                <Cart cart={cartItems} />
            </div>

            <div className="card">
                <ItemCard2 items={items} addToCart={addToCart} />
            </div>
        </div>
    );
};

export default ShopPage;
