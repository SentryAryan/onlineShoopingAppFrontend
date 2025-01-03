import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ManageMenu.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { setProducts } from '../../store/slices/products';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/slices/loadingSlice';
import Loader from '../common/Loader';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.loading);

  // Define product categories
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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('quantity', data.quantity);
      formData.append('category', data.category); // Add category to form data
      
      dispatch(setLoading(true));
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(setProducts([...products, response.data]));
      toast.success('Product added successfully');
      reset();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container max-w-4xl mx-auto mt-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600 mt-2">Fill in the details to add a new product to your inventory</p>
      </div>

      {loading ? <Loader /> : <Form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-sm">
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group controlId="formItemName">
              <Form.Label className="font-semibold text-gray-700">Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                {...register('name')}
                required
                className="form-control focus:border-green-500 focus:ring-green-500"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formItemPrice">
              <Form.Label className="font-semibold text-gray-700">Price ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter item price"
                {...register('price')}
                required
                min="0"
                step="0.01"
                className="form-control focus:border-green-500 focus:ring-green-500"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formItemQuantity">
              <Form.Label className="font-semibold text-gray-700">Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                {...register('quantity')}
                required
                min="0"
                className="form-control focus:border-green-500 focus:ring-green-500"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Form.Group controlId="formItemCategory">
              <Form.Label className="font-semibold text-gray-700">Category</Form.Label>
              <Form.Select
                {...register('category')}
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
            <Form.Group controlId="formItemDescription">
              <Form.Label className="font-semibold text-gray-700">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter item description"
                {...register('description')}
                required
                className="form-control focus:border-green-500 focus:ring-green-500"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Form.Group controlId="formItemImage">
              <Form.Label className="font-semibold text-gray-700">Upload Image</Form.Label>
              <div className="flex items-center space-x-4">
                <Form.Control
                  type="file"
                  {...register('file')}
                  required
                  accept="image/*"
                  className="form-control focus:border-green-500 focus:ring-green-500"
                />
                <div className="text-sm text-gray-500">
                  Supported formats: JPG, PNG, JPEG
                </div>
              </div>
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
            Add Product
          </Button>
        </div>
      </Form>}
    </div>
  );
};

export default AddProduct;
