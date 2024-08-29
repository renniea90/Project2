import React, { useState } from 'react';
import axios from 'axios'; 
import AddProduct from '../components/AddProduct';
import UpdateProduct from '../components/UpdateProduct';
import ProductListTable from '../components/ProductListTable';
import DeleteProduct from '../components/DeleteProduct'; 
import '../CSS/AdminPage.css'; 
import '../CSS/Modal.css';
import { useCart } from '../components/CartContext';

const AdminPage = () => {
    const { items, setItems } = useCart();
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [showUpdateDialogue, setShowUpdateDialogue] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const refetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8082/items/getAll');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div>
            <div className="container2">
                <AddProduct onAddProduct={refetchItems} />
            </div>
            <div className="table-wrapper">
                <ProductListTable
                    products={items}
                    onUpdate={(product) => {
                        setProductToUpdate(product);
                        setShowUpdateDialogue(true);
                    }}
                    onDelete={(id) => setProductIdToDelete(id)}
                />
            </div>
            {productIdToDelete !== null && (
                <DeleteProduct
                    productIdToDelete={productIdToDelete}
                    onCancel={() => setProductIdToDelete(null)}
                    onConfirm={refetchItems}
                />
            )}
            {showUpdateDialogue && productToUpdate && (
                <UpdateProduct
                    product={productToUpdate}
                    onCancel={() => setShowUpdateDialogue(false)}
                    onUpdateSuccess={refetchItems}
                />
            )}
        </div>
    );
};

export default AdminPage;
