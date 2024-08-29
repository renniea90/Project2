import React from 'react';
import ItemCard2 from '../components/ItemCard2';
import CartComponent from '../components/CartComponent';
import '../CSS/ShopPage.css';
import { useCart } from '../components/CartContext';

const ShopPage = () => {
    const { items, cartItems, addToCart } = useCart();

    return (
        <div className="main-container">
            <div className="cart-container card">
                <CartComponent cart={cartItems} />
            </div>

            <div className="card">
                <ItemCard2 items={items} addToCart={addToCart} />
            </div>
        </div>
    );
};

export default ShopPage;
