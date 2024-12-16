import { createSlice } from '@reduxjs/toolkit';

const quantitySlice = createSlice({
  name: 'quantity',
  initialState: {},  // Will store quantities as { productId: quantity }
  reducers: {
    setQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      state[productId] = quantity;
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      if (!state[productId]) state[productId] = 1;
      state[productId] += 1;
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      if (state[productId] > 1) {
        state[productId] -= 1;
      }
    },
    resetQuantity: (state, action) => {
      const productId = action.payload;
      state[productId] = 1;
    },
    clearAllQuantities: (state) => {
      return {};
    }
  }
});

export const { 
  setQuantity, 
  incrementQuantity, 
  decrementQuantity, 
  resetQuantity,
  clearAllQuantities 
} = quantitySlice.actions;
export default quantitySlice.reducer; 