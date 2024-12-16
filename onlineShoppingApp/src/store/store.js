import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products'
import currentProductReducer from './slices/currentProduct'
import isLoginReducer from './slices/isLoginSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    currentProduct: currentProductReducer,
    isLogin: isLoginReducer,
  },
})