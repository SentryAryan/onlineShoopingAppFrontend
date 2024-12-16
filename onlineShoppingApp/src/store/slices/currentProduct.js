import { createSlice } from '@reduxjs/toolkit';

const currentProductSlice = createSlice({
    name: 'currentProduct',
    initialState: null,
    reducers: {
        setCurrentProduct: (state, action) => action.payload,
    },
});

export const { setCurrentProduct } = currentProductSlice.actions;
export default currentProductSlice.reducer;

