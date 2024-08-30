import React from 'react';
import '../CSS/ItemCard2.css'; // Ensure this is included to apply the styles

const ItemCard2 = ({ items, addToCart }) => {
  return (
      <div className="item-cards-container">
          {items.map(item => (
              <div className="item-card" key={item.id}>
                  {/* Image section */}
                  <img src={item.imageUrl} alt={item.name} className="item-image" />

                  {/* Item details section */}
                  <div className="item-card-content">
                      <h3>{item.name}</h3>
                      <p>Price: £{item.price.toFixed(2)}</p>
                      <p>In Stock: {item.quantity}</p>
                      <button onClick={() => addToCart(item)} className="add-to-cart-button">Add to Cart</button>
                  </div>
              </div>
          ))}
      </div>
  );
};

export default ItemCard2;
