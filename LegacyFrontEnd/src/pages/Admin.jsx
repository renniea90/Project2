import React, { useState } from 'react';
import AddNewItem from '../components/AddNewItem';
import AdminItemsTable from '../components/AdminItemsTable';
import '../CSS/AdminPage.css'; 
import { useCart } from '../components/CartContext';

const AdminPage = () => {
    const { items, setItems } = useCart();  // setItems from CartContext

    return (
        <div>
            <div className="container2">
                <AddNewItem items={items} setItems={setItems} />
            </div>
            <div className="table-wrapper">
                <AdminItemsTable items={items} setItems={setItems} />
            </div>
        </div>
    );
};

export default AdminPage;