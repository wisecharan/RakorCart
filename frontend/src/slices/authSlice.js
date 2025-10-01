import { createSlice } from '@reduxjs/toolkit';

// 1. Initial State (Retrieve userInfo from localStorage if it exists)
const initialState = {
  userInfo: localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Handles user login/registration
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      // Handles user logout
      state.userInfo = null;
      localStorage.removeItem('userInfo'); // Clear from local storage
      // NOTE: You might need to clear other items like cart data here too.
    },
  },
});

// 2. Export the main reducer actions
export const { setCredentials, logout } = authSlice.actions;

// 3. Rename and export the LOGOUT action for use in apiSlice
// This is the line that fixes your error:
export const LOGOUT = logout; 

// 4. Export the slice reducer
export default authSlice.reducer;