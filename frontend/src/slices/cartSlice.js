import { createSlice } from '@reduxjs/toolkit';

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Helper function to update all prices and save to local storage
const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  const subtotal =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);

  // Calculate discount if a coupon is applied
  if (state.coupon) {
    state.discountPrice = addDecimals((subtotal * state.coupon.discount) / 100);
  } else {
    state.discountPrice = 0;
  }

  // Calculate total price
  state.totalPrice = (subtotal - state.discountPrice).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
};


const cartSlice = createSlice({
  name: 'cart',
  initialState: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: 'PayPal',
        coupon: null,
        discountPrice: 0,
      },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.coupon = null;
      updateCart(state);
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload;
      updateCart(state);
    },
    removeCoupon: (state) => {
      state.coupon = null;
      updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;