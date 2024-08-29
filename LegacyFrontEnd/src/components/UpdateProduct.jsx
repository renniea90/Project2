import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CustomAlert from './CustomAlert';
import ProductForm from './ProductForm';
import axios from 'axios';
import '../CSS/Modal.css';

Modal.setAppElement('#root');

const UpdateProduct = ({ product, onCancel, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({ ...product });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:8082/item/update/${formData.id}`, formData);
      if (response.status === 200) {
        setAlertMessage('Product successfully updated.');
        setShowAlert(true);
        setIsModalVisible(false);
        onUpdateSuccess(formData);
      } else {
        setAlertMessage('Failed to update product.');
        setShowAlert(true);
        setIsModalVisible(false); 
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setAlertMessage('Failed to update product.');
      setShowAlert(true);
      setIsModalVisible(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setIsModalVisible(true); 
  };

  return (
    <div>
      {isModalVisible && (
        <Modal
          isOpen={true}
          onRequestClose={onCancel}
          contentLabel="Update Product Modal"
          shouldCloseOnOverlayClick={false}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Update Product {formData.id}</h2>
          <ProductForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            isUpdateMode={true}
          />
        </Modal>
      )}

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default UpdateProduct;
