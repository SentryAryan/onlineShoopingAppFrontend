import React from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../../store/slices/products';
import { setLoading } from '../../../store/slices/loadingSlice';

const ProductList = ({ productList, onEdit, onDelete }) => {
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        dispatch(setLoading(true))
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`)
        if (response.status === 200) {
            toast.success('Product deleted successfully');
        } else {
            toast.error('Failed to delete product');
        }
        const updatedProductList = productList.filter(product => product.id !== id);
        dispatch(setProducts(updatedProductList));
        dispatch(setLoading(false))
    }
    return (
        <div className="mt-4">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description}</td>
                            <td className='align-middle text-center'>
                                <img
                                    src={product.imageUrl || 'https://via.placeholder.com/50'}
                                    alt={product.name}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    className="border rounded"
                                />
                            </td>
                            <td className='align-middle text-center'>
                                <div className='d-flex justify-content-center gap-2'>
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDelete(product.id);
                                        }}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductList;
