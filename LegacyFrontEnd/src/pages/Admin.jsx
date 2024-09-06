import React, { useState } from 'react';
import AddNewItem from '../components/AddNewItem';
import AdminItemsTable from '../components/AdminItemsTable';
import '../CSS/AdminPage.css'; 
import { useCart } from '../components/CartContext';
import useStore from '../store/store';

const AdminPage = () => {
    const { items, setItems } = useCart();  // setItems from CartContext
    // const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
    // const setIsAdmin = useStore((state) => state.setIsAdmin);
    // const setEmailStore = useStore((state) => state.setEmail);
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const isAdmin = useStore((state) => state.isAdmin);
    const email = useStore((state) => state.email);
  
    console.log('ADMIN PAGE Render - Email:', email);
    console.log('ADMIN PAGE Render - IsAuthenticated:', isAuthenticated);
    console.log('ADMIN PAGE Render - IsAdmin:', isAdmin);

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