import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('https://crud-app4-1wea.onrender.com/api/items');
    setItems(response.data);
  };

  const addItem = async () => {
    const response = await axios.post('https://crud-app4-1wea.onrender.com/api/items', { name: newItem });
    setItems([...items, response.data]);
    setNewItem('');
  };

  const editItem = async (item) => {
    setEditingItem(item);
    setNewItem(item.name);
  };

  const updateItem = async () => {
    const response = await axios.put(`https://crud-app4-1wea.onrender.com/api/items/${editingItem.id}`, { name: newItem });
    setItems(items.map(item => (item.id === editingItem.id ? response.data : item)));
    cancelEdit();
  };

  const deleteItem = async (id) => {
    await axios.delete(`https://crud-app4-1wea.onrender.com/api/items/${id}`);
    setItems(items.filter(item => item.id !== id));
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setNewItem('');
  };

  return (
    <div>
      <h1>CRUD App - Miros³aw Poloczek</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingItem ? (
        <div>
          <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
          <button onClick={updateItem}>Update</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
          <button onClick={addItem}>Add</button>
        </div>
      )}
    </div>
  );
}

export default App;
