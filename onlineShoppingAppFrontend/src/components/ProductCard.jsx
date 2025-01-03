import React from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../store/slices/currentProduct';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setCart } from '../store/slices/cartSlice';
import { incrementQuantity, decrementQuantity, setQuantity } from '../store/slices/quantitySlice';
import { setLoading } from '../store/slices/loadingSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.isLogin);
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  const cart = useSelector(state => state.cart);
  const reduxQuantity = useSelector(state => state.quantity[product.id] || 1);

  const handleProductClick = () => {
    dispatch(setCurrentProduct(product));
    if (isLogin) {
      navigate(`/currentProduct`);
    } else {
      toast.success("Please login to view product details");
      navigate(`/login`);
    }
  }

  const handleIncrement = () => {
    if (reduxQuantity < product.quantity) {
      dispatch(incrementQuantity(product.id));
    } else {
      toast.error("Maximum available quantity reached!");
    }
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  const handleAddToCart = async () => {
    try {
      if (!loggedInUser) {
        toast.success("Please login to add items to cart");
        navigate(`/login`);
        return;
      }
      dispatch(setLoading(true))
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/add-to-cart/${loggedInUser.id}/${product.id}/${reduxQuantity}`
      );
      dispatch(setCart(response.data));
      dispatch(setQuantity({ productId: product.id, quantity: reduxQuantity }));
      dispatch(setLoading(false))
      toast.success("Item added to cart!");
    } catch (error) {
      dispatch(setLoading(false))
      console.error("Error adding item to cart:", error);
      toast.error("Product already in cart");
    }
  }

  const handleRemoveFromCart = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/cart/${loggedInUser.id}/${product.id}`
      );
      dispatch(setCart(response.data));
      dispatch(setQuantity({ productId: product.id, quantity: 1 }));
      dispatch(setLoading(false))
      toast.success("Item removed from cart!");
    } catch (error) {
      dispatch(setLoading(false))
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 
                    transform hover:-translate-y-1 overflow-hidden">
        <div 
            className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer" 
            onClick={handleProductClick}
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                loading="lazy"
            />
            {product.quantity < 5 && (
                <div className="absolute top-3 right-3">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                        Only {product.quantity} left
                    </span>
                </div>
            )}
        </div>

        <div className="p-5">
            <div className="mb-4">
                <h2 
                    className="text-xl font-semibold text-gray-800 mb-2 truncate hover:text-blue-600 cursor-pointer"
                    onClick={handleProductClick}
                >
                    {product.name}
                </h2>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold text-blue-600">
                        ${Number(product.price).toFixed(2)}
                    </p>
                    <span className={`text-sm font-medium ${product.quantity < 5 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.quantity} in stock
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-4">
                <span className="text-sm text-gray-600 font-medium">Qty:</span>
                <div className="flex items-center">
                    <button
                        onClick={handleDecrement}
                        disabled={reduxQuantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-l-md bg-white 
                                border border-gray-200 text-gray-600 hover:bg-gray-50
                                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        -
                    </button>
                    <span className="w-12 h-8 flex items-center justify-center bg-white border-y border-gray-200">
                        {reduxQuantity}
                    </span>
                    <button
                        onClick={handleIncrement}
                        disabled={reduxQuantity >= product.quantity}
                        className="w-8 h-8 flex items-center justify-center rounded-r-md bg-white 
                                border border-gray-200 text-gray-600 hover:bg-gray-50
                                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            <button 
                onClick={cart.some(item => item.product.id === product.id) ? handleRemoveFromCart : handleAddToCart}
                className={`w-full py-3 rounded-md font-medium flex items-center justify-center gap-2
                         text-sm transition-all duration-300 ${
                           cart.some(item => item.product.id === product.id)
                           ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                           : 'bg-blue-600 text-white hover:bg-blue-700'
                         }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                {cart.some(item => item.product.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
        </div>
    </div>
  )
}

export default ProductCard 