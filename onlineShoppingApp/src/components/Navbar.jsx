import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/akhileshLogo.png';
import { useSelector } from 'react-redux';
import { setIsLogin } from '../store/slices/isLoginSlice';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';
import { setCurrentProduct } from '../store/slices/currentProduct';

function Navbar() {
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const products = useSelector(state => state.products.products);

  const handleSearch = (data) => {
    console.log(data);
    console.log(products);
    const filteredProducts = products.filter(product => product.name === data.searchQuery);
    console.log(filteredProducts);
    dispatch(setCurrentProduct(filteredProducts[0]));
    if(isLogin) {
      navigate('/currentProduct');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    dispatch(setIsLogin(false));
    dispatch(setLoggedInUser(null));
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section: Logo and Primary Navigation */}
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={logo} 
              alt="Brand Logo" 
              className="h-20 w-auto"
            />
          </div>

          {/* Primary Navigation */}
          <div className="flex space-x-6">
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
        </div>

        {/* Right Section: Search, Profile, Logout */}
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

          {isLogin && (
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
            </div>
          )}
          
          {!isLogin && (
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
    </nav>
  );
}

export default Navbar;
