import React, { useState } from 'react';
import axios from 'axios'; 
// import AddProduct from '../components/AddProduct';
import AddNewItem from '../components/AddNewItem';
import UpdateProduct from '../components/UpdateProduct';
// import ProductListTable from '../components/ProductListTable';
import AdminItemsTable from '../components/AdminItemsTable';
import DeleteProduct from '../components/DeleteProduct'; 
import '../CSS/AdminPage.css'; 
import '../CSS/Modal.css';
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