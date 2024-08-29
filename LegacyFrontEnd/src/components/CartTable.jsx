import React from 'react';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';
import CartActions from './CartActions';
import '../CSS/CartTable.css';
import { useCart } from './CartContext';

const CartTable = ({ itemMap, total, serviceCharge }) => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    return (
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
                {cartItems.map((item) => (
                    <CartItemRow
                        key={item.id}
                        item={item}
                        itemMap={itemMap}
                        handleQuantityChange={(id, e) => updateQuantity(id, parseInt(e.target.value))}
                        handleRemoveItem={() => removeFromCart(item.id)}
                    />
                ))}
            </tbody>
            <tfoot>
                <CartSummary total={total} serviceCharge={serviceCharge} />
                <tr>
                    <td colSpan="5">
                        <CartActions />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default CartTable;
