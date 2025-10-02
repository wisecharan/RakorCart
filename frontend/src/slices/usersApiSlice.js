import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/api/users/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetUsersQuery, 
  useDeleteUserMutation,
  useUpdateProfileMutation,
} = usersApiSlice;