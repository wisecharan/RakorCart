import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('wishlist')
  ? JSON.parse(localStorage.getItem('wishlist'))
  : { wishlistItems: [] };

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existItem = state.wishlistItems.find((x) => x._id === item._id);
      if (!existItem) {
        state.wishlistItems.push(item);
      }
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;