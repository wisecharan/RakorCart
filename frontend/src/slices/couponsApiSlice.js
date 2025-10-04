import { apiSlice } from './apiSlice';

export const couponsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    validateCoupon: builder.mutation({
      query: (data) => ({
        url: '/api/coupons/validate',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useValidateCouponMutation } = couponsApiSlice;