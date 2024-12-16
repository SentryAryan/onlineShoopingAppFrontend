import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductDetails.css';
import { useSelector } from 'react-redux';

const ProductDetails = () => {
    const currentProduct = useSelector(state => state.currentProduct);

    return (
        <div className="product-page">
            <div className="product-image-section">
                <div className="product-image">
                    <img src={currentProduct.imageUrl} alt={currentProduct.name} />
                </div>
            </div>
            <div className="product-details">
                <div className="product-title-desc">
                    <h1>Title: {currentProduct.name}</h1>
                    <p>Description: {currentProduct.description}</p>
                </div>
                <h2>Price: ${currentProduct.price}</h2>
                <button >Add To Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;