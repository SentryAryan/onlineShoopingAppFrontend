import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/akhileshLogo.png';
import { useSelector } from 'react-redux';
import { setIsLogin } from '../store/slices/isLoginSlice';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';
import { setCurrentProduct } from '../store/slices/currentProduct';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { clearAllQuantities } from '../store/slices/quantitySlice';
import { clearCart } from '../store/slices/cartSlice';
import { setLoading } from '../store/slices/loadingSlice';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const products = useSelector(state => state.products.products);
  const cart = useSelector(state => state.cart);
  const quantity = useSelector(state => state.quantity);
  const loggedInUser = useSelector(state => state.auth.loggedInUser);

  const handleSearch = (data) => {
    const filteredProducts = products.filter(product => product.name === data.searchQuery);
    console.log(filteredProducts);
    dispatch(setCurrentProduct(filteredProducts[0]));
    if (isLogin) {
      navigate('/currentProduct');
    } else {
      toast.success("Please login to view product details");
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all(cart.map(async (item) => {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/add-to-cart/${loggedInUser.id}/${item.product.id}/${quantity[item.product.id]}`
        );
      }));
      toast.success("Logout successful");
      dispatch(setIsLogin(false));
      dispatch(setLoggedInUser(null));
      dispatch(clearAllQuantities());
      dispatch(clearCart());
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Error during logout");
    } finally {
      dispatch(setLoading(false));
      navigate('/');
    }
  };

  const handleCart = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all(cart.map(async (item) => {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/add-to-cart/${loggedInUser.id}/${item.product.id}/${quantity[item.product.id]}`
        );
      }));
      toast.success("Cart updated successfully");
      navigate('/cart');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.success("All products added in cart");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="Brand Logo" className="h-16 sm:h-20 w-auto" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            {isLogin && (
              <div className="flex items-center mr-4">
                <NavLink to={"/cart"}>
                  <div className='relative' onClick={() => handleCart()}>
                    <FaShoppingCart className='text-2xl hover:text-green-400 duration-300' />
                    {cart.length > 0 && (
                      <span className='absolute -top-1 -right-2 text-xs bg-green-500 text-white flex justify-center items-center rounded-full w-5 h-5 animate-bounce'>
                        {cart.length}
                      </span>
                    )}
                  </div>
                </NavLink>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-12">
            {/* Navigation Links */}
            <div className="flex space-x-8">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-blue-600 font-[700] text-lg transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-gray-600 hover:text-blue-600 font-[700] text-lg transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigate('/about')}
                className="text-gray-600 hover:text-blue-600 font-[700] text-lg transition-colors"
              >
                About Us
              </button>
            </div>

            {/* Search, Profile, Cart */}
            <div className="flex items-center space-x-6">
              <form onSubmit={handleSubmit(handleSearch)} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  {...register('searchQuery')}
                  className="pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
              </form>

              {isLogin ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/profile')}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FaUserCircle className="w-9 h-9" />
                  </button>
                  <button
                    onClick={() => handleLogout()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-[700]"
                  >
                    Logout
                  </button>
                  <NavLink to={"/cart"}>
                    <div className='relative' onClick={() => handleCart()}>
                      <FaShoppingCart className='text-2xl hover:text-green-400 duration-300' />
                      {cart.length > 0 && (
                        <span className='absolute -top-1 -right-2 text-xs bg-green-500 text-white flex justify-center items-center rounded-full w-5 h-5 animate-bounce'>
                          {cart.length}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-[700]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-[700]"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSubmit(handleSearch)} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  {...register('searchQuery')}
                  className="w-full pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
              </form>

              {/* Mobile Navigation Links */}
              <button
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-blue-600 font-[700] text-lg py-2"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-blue-600 font-[700] text-lg py-2"
              >
                Contact Us
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-blue-600 font-[700] text-lg py-2"
              >
                About Us
              </button>

              {/* Mobile Auth Buttons */}
              {isLogin ? (
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                  >
                    <FaUserCircle className="w-6 h-6" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-[700] w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-[700] w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/signup');
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-[700] w-full"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
