import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../store/slices/loadingSlice';


const ProductForm = ({ product, onSubmit, categories }) => {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        description: '',
        quantity: '',
        category: '',
        productImage: null,
        currentImageUrl: ''
    });
    const dispatch = useDispatch()
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const [isUsingUrl, setIsUsingUrl] = useState(false);

    const urlToFile = async (url) => {
        try {
            const secureUrl = url.replace('http://', 'https://');
            const response = await fetch(secureUrl);
            const blob = await response.blob();
            const filename = secureUrl.split('/').pop();
            return new File([blob], filename, { type: blob.type });
        } catch (error) {
            console.error('Error converting URL to File:', error);
            return null;
        }
    };

    useEffect(() => {
        if (product) {
            const secureImageUrl = product.imageUrl ? product.imageUrl.replace('http://', 'https://') : '';
            
            setFormData({
                productName: product.name || '',
                price: product.price || '',
                description: product.description || '',
                quantity: product.quantity || '',
                category: product.category || '',
                productImage: null,
                currentImageUrl: secureImageUrl
            });
            setPreviewImage(secureImageUrl || null);

            if (secureImageUrl) {
                urlToFile(secureImageUrl).then(file => {
                    if (file) {
                        setFormData(prev => ({
                            ...prev,
                            productImage: file
                        }));
                    }
                });
            }

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            setFormData({
                productName: '',
                price: '',
                description: '',
                quantity: '',
                category: '',
                productImage: null,
                currentImageUrl: ''
            });
            setPreviewImage(null);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                productImage: file,
                currentImageUrl: '' // Clear the current image URL when new file is selected
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            productImage: null,
            currentImageUrl: ''
        }));
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUrlSubmit = async (url) => {
        try {
            const file = await urlToFile(url);
            if (file) {
                setFormData(prev => ({
                    ...prev,
                    productImage: file
                }));
                setPreviewImage(URL.createObjectURL(file));
            }
        } catch (error) {
            console.error('Error handling URL:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.productName);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('category', formData.category);
        
        if (formData.productImage) {
            formDataToSend.append('file', formData.productImage);
        } else if (formData.currentImageUrl) {
            formDataToSend.append('imageUrl', formData.currentImageUrl);
        }

        try {
            let response;
            if (product) {
                dispatch(setLoading(true))
                response = await axios.put(
                    `${import.meta.env.VITE_API_BASE_URL}/api/products/${product.id}`,
                    formDataToSend
                );
                toast.success("Product updated successfully");
            } else {
                dispatch(setLoading(true))
                response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/products`,
                    formDataToSend
                );
                toast.success("Product added successfully");
            }
            
            if (onSubmit) {
                onSubmit(response.data);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            dispatch(setLoading(false));
        }

    };

    return (
        <Form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Group controlId="productName">
                        <Form.Label className="font-semibold text-gray-700">Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                            className="form-control focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter product name"
                        />
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group controlId="price">
                        <Form.Label className="font-semibold text-gray-700">Price ($)</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="form-control focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter price"
                        />
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group controlId="quantity">
                        <Form.Label className="font-semibold text-gray-700">Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                            className="form-control focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter quantity"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={12}>
                    <Form.Group controlId="description">
                        <Form.Label className="font-semibold text-gray-700">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="form-control focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter product description"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={12}>
                    <Form.Group controlId="category">
                        <Form.Label className="font-semibold text-gray-700">Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="form-control focus:border-green-500 focus:ring-green-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={12}>
                    <Form.Group controlId="productImage">
                        <Form.Label className="font-semibold text-gray-700">Product Image</Form.Label>
                        <div className="flex items-center space-x-4">
                            <Form.Control
                                ref={fileInputRef}
                                type="file"
                                name="productImage"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="form-control focus:border-green-500 focus:ring-green-500"
                            />
                            <div className="text-sm text-gray-500">
                                Supported formats: JPG, PNG, JPEG
                            </div>
                        </div>
                        {previewImage && (
                            <div className="mt-4 flex items-center gap-4">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded border p-1"
                                />
                                <Button 
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleRemoveImage}
                                    className="hover:bg-red-50"
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </Form.Group>
                </Col>
            </Row>

            <div className="flex justify-end">
                <Button 
                    type="submit"
                    className="px-6 py-2.5 bg-green-600 text-white font-medium text-sm 
                             leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg 
                             focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 
                             active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    {product ? 'Update Product' : 'Add Product'}
                </Button>
            </div>
        </Form>
    );
};

export default ProductForm;
