import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
      }),
      providesTags: ['Order'], // Provides a tag for this specific order
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/api/orders/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
      invalidatesTags: ['Order'], // Invalidates the order cache after payment
    }),
    getPayPalClientId: builder.query({
      query: () => ({ url: '/api/config/paypal' }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({ url: `/api/orders/myorders` }),
      providesTags: ['Order'], // Provides tags for the user's list of orders
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({ url: '/api/orders' }),
      providesTags: ['Order'], // Provides tags for the admin's list of all orders
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'], // Invalidates the order cache after delivery
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;