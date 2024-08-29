import React, { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';
import CartTable from '../components/CartTable';
import '../CSS/CartPage.css';

const CartPage = () => {
    const { cartItems } = useCart();
    const [itemMap, setItemMap] = useState({});

    useEffect(() => {
        const map = cartItems.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {});
        setItemMap(map);
    }, [cartItems]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const calculateServiceCharge = (total) => {
        return (total * 0.0725).toFixed(2);
    };

    const total = parseFloat(calculateTotal());
    const serviceCharge = calculateServiceCharge(total);

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <CartTable
                itemMap={itemMap}
                total={total}
                serviceCharge={serviceCharge}
            />
        </div>
    );
};

export default CartPage;
