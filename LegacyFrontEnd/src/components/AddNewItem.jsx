import { useState } from 'react';
import { useCart } from '../components/CartContext'; // Import the useCart hook to get access to fetchItems
import '../CSS/AddNewItem.css';

const AddNewItem = () => {
  const { setItems, fetchItems } = useCart(); // Get fetchItems from CartContext
  const [name, setItemName] = useState('');
  const [price, setItemPrice] = useState('');
  const [quantity, setItemQuantity] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Item Name is required';
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0)
      newErrors.price = 'Valid Item Price is required';
    if (!quantity || isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0)
      newErrors.quantity = 'Valid Quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddNewItem = () => {
    if (!validateFields()) return;

    const newItem = {
      name: name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      imageUrl: '' // Assuming imageUrl is not used or is set somewhere else
    };

    saveNewItemToBackend(newItem);
  };

  const saveNewItemToBackend = (newItem) => {
    fetch('http://localhost:8082/item/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add new item');
      }
      return response.json();  // Ensure the new item data is returned as JSON
    })
    .then(savedItem => {
      setItems(prevItems => [...prevItems, savedItem]); // Update items with the new item
      setItemName('');
      setItemPrice('');
      setItemQuantity('');
      setErrors({});
      fetchItems(); // Trigger a fetch to refresh the items list
    })
    .catch(error => {
      console.error('Failed to add new item:', error);
      setErrors({ submit: 'Failed to add new item. Please try again.' });
    });
  };

  return (
    <div className="add-new-item-card">
      <h2>Add Item to Stock</h2>
      <div className="form-field">
        <label>Item Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setItemName(e.target.value)}
          style={{ borderColor: errors.name ? 'red' : '' }}
        />
      </div>
      {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      <div className="form-field">
        <label>Item Price (£):</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setItemPrice(e.target.value)}
          style={{ borderColor: errors.price ? 'red' : '' }}
        />
      </div>
      {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
      <div className="form-field">
        <label>Quantity to Add:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setItemQuantity(e.target.value)}
          style={{ borderColor: errors.quantity ? 'red' : '' }}
        />
      </div>
      {errors.quantity && <span style={{ color: 'red' }}>{errors.quantity}</span>}
      {errors.submit && <span style={{ color: 'red' }}>{errors.submit}</span>}
      <button onClick={handleAddNewItem} className="add-item-button">
        Add Item
      </button>
    </div>
  );
};

export default AddNewItem;
