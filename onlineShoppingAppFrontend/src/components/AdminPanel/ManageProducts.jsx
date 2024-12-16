import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProductForm from './SubFileOfManageProducts/ProductForm';
import ProductList from './SubFileOfManageProducts/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../store/slices/products';
import axios from 'axios';

const ManageProducts = () => {
    const productList = useSelector(state => state.products.products);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const dispatch = useDispatch();

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/products/${id}`);
            // Refresh product list after deletion
            const response = await axios.get('http://localhost:8081/api/products');
            dispatch(setProducts(response.data));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleFormSubmit = async (updatedProduct) => {
        try {
            // Refresh product list after update
            const response = await axios.get('http://localhost:8081/api/products');
            dispatch(setProducts(response.data));
            setShowModal(false);
            setCurrentProduct(null);
        } catch (error) {
            console.error('Error refreshing products:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Manage Products</h1>
            </div>

            <ProductList
                productList={productList}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{currentProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductForm onSubmit={handleFormSubmit} product={currentProduct} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageProducts;
