import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
// Only need to import the base API slice
import { apiSlice } from './slices/apiSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    // Use the single apiSlice reducer
    [apiSlice.reducerPath]: apiSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    // Only concatenate the middleware of the base apiSlice
    getDefaultMiddleware().concat(apiSlice.middleware), 
  devTools: true,
});

export default store;