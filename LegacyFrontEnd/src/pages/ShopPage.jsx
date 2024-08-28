import { useEffect } from 'react';
import ItemCard2 from '../components/ItemCard2';
import useCart from '../components/UseCart';
import CartComponent from '../components/CartComponent'; 
import '../CSS/ShopPage.css';

const ShopPage = () => {
  const { items, cart, setItems, addToCart, setCart } = useCart();

  useEffect(() => {
      fetch('http://localhost:8082/items/getAll')
          .then((response) => response.json())
          .then((data) => setItems(data))
          .catch(error => console.error('Failed to load items', error));
  }, [setItems]);

  return (
      <div className="main-container">
          <div className="cart-container card">
              <CartComponent cart={cart} setCart={setCart} items={items} setItems={setItems} />
          </div>
          
          <div className="card">
              <ItemCard2 items={items} setItems={setItems} addToCart={addToCart} />
          </div>
      </div>
  );
};

export default ShopPage;
