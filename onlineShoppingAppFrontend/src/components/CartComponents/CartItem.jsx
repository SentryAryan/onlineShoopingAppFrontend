import React from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../store/slices/cartSlice';
import { incrementQuantity, decrementQuantity } from '../../store/slices/quantitySlice';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  const { product, quantity } = cartItem;
  const reduxQuantity = useSelector(state => state.quantity[product.id] || 1);

  const handleIncrement = () => {
    if (reduxQuantity < product.quantity) {
      dispatch(incrementQuantity(product.id));
    } else {
      toast.error("Maximum available quantity reached!");
    }
  };

  const handleDecrement = () => {
    if (reduxQuantity > 1) {
      dispatch(decrementQuantity(product.id));
    }
  };

  const removeHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/users/cart/${loggedInUser.id}/${product.id}`
      );
      dispatch(setCart(response.data));
      dispatch(setQuantity({ productId: product.id, quantity: 1 }));
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row p-4 gap-6">
        <div className="w-full sm:w-48 h-48 flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain rounded-md"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Unit Price:</span>
                <span className="text-lg font-semibold text-gray-800">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  ${(product.price * reduxQuantity).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={handleDecrement}
                  disabled={reduxQuantity <= 1}
                  className="w-8 h-8 flex items-center justify-center bg-gray-50 
                           hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
                           border-r transition-colors"
                >
                  -
                </button>
                <span className="w-12 h-8 flex items-center justify-center bg-white">
                  {reduxQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={reduxQuantity >= product.quantity}
                  className="w-8 h-8 flex items-center justify-center bg-gray-50 
                           hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
                           border-l transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={removeHandler}
                className="flex items-center justify-center w-8 h-8 rounded-full
                         bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
              >
                <MdDelete className="text-xl" />
              </button>
            </div>
          </div>

          {product.quantity < 5 && (
            <div className="mt-3">
              <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full">
                Only {product.quantity} items left in stock
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
