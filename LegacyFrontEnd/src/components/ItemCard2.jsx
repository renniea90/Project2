import { useEffect } from 'react';

const ItemCard2 = ({ items, setItems, addToCart }) => {
  
  useEffect(() => {
    fetch('http://localhost:8082/items/getAll')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Failed to load items:', error));
  }, [setItems]);

  return (
    <div className="item-cards-container">
      {items.map(item => {
        const price = parseFloat(item.price).toFixed(2);
        return (
          <div className="item-card" key={item.id}>
            <div className="item-card-content">
              <h3>{item.name}</h3>
              <p>Price: £{price}</p>
              <p>In Stock: {item.quantity}</p>
              <button onClick={() => addToCart(item)} className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemCard2;
