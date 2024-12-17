import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { FaShoppingCart, FaStar, FaShieldAlt } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdLocalOffer } from 'react-icons/md';
import { incrementQuantity, decrementQuantity, setQuantity } from '../../store/slices/quantitySlice';
import { setCart } from '../../store/slices/cartSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';

const ProductDetails = () => {
    const currentProduct = useSelector(state => state.currentProduct);
    const reduxQuantity = useSelector(state => state.quantity[currentProduct.id] || 1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const loggedInUser = useSelector(state => state.auth.loggedInUser);
    const isLogin = useSelector(state => state.isLogin);

    const handleIncrement = () => {
        if (reduxQuantity < currentProduct.quantity) {
            dispatch(incrementQuantity(currentProduct.id));
        } else {
            toast.error("Maximum available quantity reached!");
        }
    };

    const handleDecrement = () => {
        if (reduxQuantity > 1) {
            dispatch(decrementQuantity(currentProduct.id));
        }
    };

    const handleAddToCart = async () => {
        try {
            if (!loggedInUser) {
                toast.success("Please login to add items to cart");
                navigate(`/login`);
                return;
            }
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/add-to-cart/${loggedInUser.id}/${currentProduct.id}/${reduxQuantity}`
            );
            dispatch(setCart(response.data));
            dispatch(setQuantity({ productId: currentProduct.id, quantity: reduxQuantity }));
            toast.success("Item added to cart!");
        } catch (error) {
            console.error("Error adding item to cart:", error);
            toast.error("Product already in cart");
        }
    }

    const handleRemoveFromCart = async () => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/cart/${loggedInUser.id}/${currentProduct.id}`
            );
            dispatch(setCart(response.data));
            dispatch(setQuantity({ productId: currentProduct.id, quantity: 1 }));
            toast.success("Item removed from cart!");
        } catch (error) {
            console.error("Error removing item from cart:", error);
            toast.error("Failed to remove item from cart");
        }
    }

    return (
        <div className="product-page flex justify-center items-center min-h-screen py-8">
            <div className="product-container">
                {/* Left Section - Image */}
                <div className="product-image-section">
                    <div className="product-image-wrapper">
                        <img 
                            src={currentProduct.imageUrl} 
                            alt={currentProduct.name} 
                            className="product-img"
                        />
                    </div>
                </div>

                {/* Right Section - Details */}
                <div className="product-details">
                    {/* Breadcrumb */}
                    <div className="breadcrumb text-center">
                        Welcome, {loggedInUser?.name || 'Guest'}
                    </div>

                    {/* Title and Rating */}
                    <div className="product-header">
                        <h1>{currentProduct.name}</h1>
                        <div className="rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="star-icon" />
                                ))}
                                <span>(4.5)</span>
                            </div>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="price-section">
                        <div className="price-container">
                            <span className="current-price">${currentProduct.price}</span>
                            <span className="original-price">${(currentProduct.price * 1.2).toFixed(2)}</span>
                            <span className="discount">20% OFF</span>
                        </div>
                        <p className="tax-info">Inclusive of all taxes</p>
                    </div>

                    {/* Offers */}
                    <div className="offers-section">
                        <h3><MdLocalOffer className="offer-icon" /> Available Offers</h3>
                        <ul>
                            <li>Bank Offer: 5% Cashback on Axis Bank Cards</li>
                            <li>Special Price: Get extra 10% off (price inclusive of discount)</li>
                        </ul>
                    </div>

                    {/* Description */}
                    <div className="description-section">
                        <h3>Product Description</h3>
                        <p>{currentProduct.description}</p>
                    </div>

                    {/* Delivery and Services */}
                    <div className="services-section">
                        <div className="service-item">
                            <TbTruckDelivery className="service-icon" />
                            <span>Free Delivery</span>
                        </div>
                        <div className="service-item">
                            <FaShieldAlt className="service-icon" />
                            <span>1 Year Warranty</span>
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="stock-status">
                        <span className={`stock-badge ${currentProduct.quantity < 5 ? 'low-stock' : 'in-stock'}`}>
                            {currentProduct.quantity < 5 
                                ? `Only ${currentProduct.quantity} left in stock!` 
                                : `${currentProduct.quantity} units available`}
                        </span>
                    </div>

                    {/* Quantity Section */}
                    <div className="quantity-section">
                        <h3>Select Quantity</h3>
                        <div className="quantity-controls">
                            <button
                                onClick={handleDecrement}
                                disabled={reduxQuantity <= 1}
                                className="quantity-btn"
                            >
                                -
                            </button>
                            <span className="quantity-display">{reduxQuantity}</span>
                            <button
                                onClick={handleIncrement}
                                disabled={reduxQuantity >= currentProduct.quantity}
                                className="quantity-btn"
                            >
                                +
                            </button>
                        </div>
                        <span className="quantity-limit-text">
                            Maximum {currentProduct.quantity} units allowed
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button 
                            onClick={cart.some(item => item.product.id === currentProduct.id) ? handleRemoveFromCart : handleAddToCart}
                            className={`add-to-cart-button ${
                                cart.some(item => item.product.id === currentProduct.id) ? 'remove-from-cart' : ''
                            }`}
                        >
                            <FaShoppingCart className="cart-icon" />
                            {cart.some(item => item.product.id === currentProduct.id) ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                        <button 
                            className="continue-shopping-button"
                            onClick={() => navigate('/')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;