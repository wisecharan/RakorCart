import { apiSlice } from './apiSlice'; // Import the central apiSlice

// Inject the order-specific endpoints into the base apiSlice
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: { ...order },
      }),
      invalidatesTags: ['Order'], // Mark the order list as stale
    }),
    // We will add getOrderDetails and payOrder here next
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;