import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProductForm from './SubFileOfManageProducts/ProductForm';
import ProductList from './SubFileOfManageProducts/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../store/slices/products';
import axios from 'axios';
import { setLoading } from '../../store/slices/loadingSlice';
import Loader from '../common/Loader';

const ManageProducts = () => {
    const productList = useSelector(state => state.products.products);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);

    // Define product categories - same as in AddProduct
    const categories = [
        "Electronics",
        "Clothing",
        "Books",
        "Home & Kitchen",
        "Sports & Outdoors",
        "Beauty & Personal Care",
        "Toys & Games",
        "Health & Wellness",
        "Automotive",
        "Pet Supplies",
        "Jewelry",
        "Food & Beverages",
        "Office Products",
        "Musical Instruments",
        "Tools & Home Improvement"
    ];

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            dispatch(setLoading(true))
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`);
            // Refresh product list after deletion
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
            dispatch(setProducts(response.data));
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleFormSubmit = async (updatedProduct) => {
        try {
            dispatch(setLoading(true))
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
            dispatch(setProducts(response.data));
            setShowModal(false);
            setCurrentProduct(null);
        } catch (error) {
            console.error('Error refreshing products:', error);
        } finally {
            dispatch(setLoading(false));
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
                categories={categories} // Pass categories to ProductList
            />

            {loading ? <Loader/> : <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{currentProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductForm 
                        onSubmit={handleFormSubmit} 
                        product={currentProduct}
                        categories={categories} // Pass categories to ProductForm
                    />
                </Modal.Body>
            </Modal>}
        </div>
    );
};

export default ManageProducts;
