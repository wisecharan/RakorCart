import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/api/users/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/api/users/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/api/users/logout`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/api/users/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => '/api/users',
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: 'DELETE',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/api/users/forgotpassword`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/api/users/resetpassword/${token}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = usersApiSlice;