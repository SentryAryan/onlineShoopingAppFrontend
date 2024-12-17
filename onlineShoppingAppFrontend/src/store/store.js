import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products'
import currentProductReducer from './slices/currentProduct'
import isLoginReducer from './slices/isLoginSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import quantityReducer from './slices/quantitySlice'
import loadingReducer from './slices/loadingSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    currentProduct: currentProductReducer,
    isLogin: isLoginReducer,
    cart: cartReducer,
    quantity: quantityReducer,
    loading: loadingReducer,
  },
})