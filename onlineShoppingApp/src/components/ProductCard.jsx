import React from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../store/slices/currentProduct';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductCard({ product }) {

  console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.isLogin);

  const handleProductClick = () => {
    dispatch(setCurrentProduct(product));
    if(isLogin) {
      navigate(`/currentProduct`);
    } else {
      navigate(`/login`);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-72 m-4" onClick={() => handleProductClick(product.id)}>
      <div className="relative h-48 overflow-hidden group" onClick={() => handleProductClick()}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
            {product.name}
          </h2>
          <p className="text-green-600 font-bold text-lg">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard 