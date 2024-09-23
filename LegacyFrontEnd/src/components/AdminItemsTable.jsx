import { useEffect, useState } from 'react';

const AdminItemsTable = ({ items, setItems }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({
    name: '',
    price: '',
    quantity: '',
    imageUrl: '', // Add imageUrl to the editable fields
  });

  useEffect(() => {
    fetch('http://localhost:8082/item/getAll')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(error => console.error('Failed to load items:', error));
  }, [setItems]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditItem({
      name: items[index].name,
      price: items[index].price,
      quantity: items[index].quantity,
      imageUrl: items[index].imageUrl, // Populate imageUrl for editing
    });
  };

  const handleSave = (id) => {
    const updatedItem = {
      ...items.find(item => item.id === id),
      ...editItem,
      price: parseFloat(editItem.price),
      quantity: parseInt(editItem.quantity, 10),
      imageUrl: editItem.imageUrl, // Save the updated imageUrl
    };

    saveItemToBackend(id, updatedItem);
  };

  const saveItemToBackend = (id, updatedItem) => {
    fetch(`http://localhost:8082/item/update/${id}`, {
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update item');
        }
        return response.json();
      })
      .then(savedItem => {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === id ? savedItem : item
          )
        );
        setEditIndex(null);
      })
      .catch(error => console.error('Failed to update item:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8082/item/remove/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text(); 
      })
      .then(() => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      })
      .catch(error => console.error('Failed to delete item:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  return (
    <div className="admin_items_table">
      <h2>Current Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Image</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Currently In Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id || index}>
              <td>{item.id}</td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="imageUrl"
                    value={editItem.imageUrl}
                    onChange={handleInputChange}
                  />
                ) : (
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: 'auto' }} />
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="name"
                    value={editItem.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="price"
                    value={editItem.price}
                    onChange={handleInputChange}
                  />
                ) : (
                  `£${item.price !== undefined ? item.price.toFixed(2) : '0.00'}`
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editItem.quantity}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.quantity !== undefined ? item.quantity : '0'
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button onClick={() => handleSave(item.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminItemsTable;
