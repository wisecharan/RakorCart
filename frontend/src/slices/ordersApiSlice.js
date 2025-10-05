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
      providesTags: ['Order'],
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/api/orders/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
      invalidatesTags: ['Order'],
    }),
    getPayPalClientId: builder.query({
      query: () => ({ url: '/api/config/paypal' }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({ url: `/api/orders/myorders` }),
      providesTags: ['Order'],
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({ url: '/api/orders' }),
      providesTags: ['Order'],
      keepUnusedDataFor: 5,
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/api/orders/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order'],
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
  useUpdateOrderStatusMutation, // This is the correct hook
} = ordersApiSlice;