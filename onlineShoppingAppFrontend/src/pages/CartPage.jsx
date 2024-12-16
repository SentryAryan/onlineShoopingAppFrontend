import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import CartItem from '../components/CartComponents/CartItem';
import toast from 'react-hot-toast';

export default function CartPage() {
    const cart = useSelector((state) => state.cart);
    const reduxQuantity = useSelector((state) => state.quantity);
    // Calculate total with quantities from cart items
    const totalAmount = cart.reduce((total, item) => {
        return total + (Number(item.product.price) * reduxQuantity[item.product.id]);
    }, 0);

    const handleCheckout = () => {
        toast.success("Checkout successful");
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
                {cart.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-12'>
                        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                            Your cart is empty!
                        </h2>
                        <p className='text-gray-600 mb-8'>
                            Add some items to your cart to see them here.
                        </p>
                        <NavLink to="/" className="w-full max-w-md">
                            <button className='w-full bg-green-600 text-white py-3 px-6 
                                rounded-lg font-semibold hover:bg-green-700 
                                transition-colors duration-300 shadow-sm'>
                                Continue Shopping
                            </button>
                        </NavLink>
                    </div>
                ) : (
                    <div className='flex flex-col lg:flex-row gap-8'>
                        <div className='lg:w-2/3'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                                Shopping Cart ({cart.length} items)
                            </h2>
                            <div className='space-y-6'>
                                {cart.map((cartItem) => (
                                    <CartItem 
                                        key={cartItem.product.id} 
                                        cartItem={cartItem}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Order Summary Section */}
                        <div className='lg:w-1/3'>
                            <div className='bg-gray-50 rounded-lg p-6 sticky top-6'>
                                <h2 className='text-xl font-bold text-gray-800 mb-6'>
                                    Order Summary
                                </h2>
                                
                                <div className='space-y-4'>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Subtotal</span>
                                        <span>₹{totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className='border-t border-gray-200 pt-4 mt-4'>
                                        <div className='flex justify-between text-lg font-bold text-gray-800'>
                                            <span>Total</span>
                                            <span>₹{totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleCheckout()}
                                    className='w-full bg-green-600 text-white mt-6 py-3 
                                        rounded-lg font-semibold hover:bg-green-700 
                                        transition-colors duration-300 shadow-sm'
                                >
                                    Proceed to Checkout
                                </button>

                                <NavLink to="/">
                                    <button className='w-full mt-4 bg-white text-green-600 
                                        border-2 border-green-600 py-3 rounded-lg font-semibold 
                                        hover:bg-green-50 transition-colors duration-300'>
                                        Continue Shopping
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
