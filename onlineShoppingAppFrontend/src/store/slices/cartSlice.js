import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.find(item => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: () => []
  },
});

export const { setCart, addToCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
