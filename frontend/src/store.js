import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { productsApiSlice } from './slices/productsApiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  // This middleware is essential for RTK Query to function
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
  devTools: true,
});

export default store;