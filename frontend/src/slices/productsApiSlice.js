import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 1. Update the baseQuery to include the token
const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the auth slice in our Redux state
    const { userInfo } = getState().auth;
    if (userInfo && userInfo.token) {
      // Set the authorization header
      headers.set('authorization', `Bearer ${userInfo.token}`);
    }
    return headers;
  },
});

export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery, // Use the updated baseQuery
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),
    getProductDetails: builder.query({
      query: (productId) => `/api/products/${productId}`,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: '/api/products',
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productsApiSlice;