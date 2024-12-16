import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;
export default authSlice.reducer;

