import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOGOUT } from './authSlice';

// Define the shared baseQuery...
const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    const { userInfo } = getState().auth; 
    if (userInfo && userInfo.token) {
      headers.set('authorization', `Bearer ${userInfo.token}`);
    }
    return headers;
  },
});

// Custom baseQuery that handles 401 unauthorized errors (for automatic logout)
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Dispatch the LOGOUT action to clear state and local storage
    api.dispatch(LOGOUT()); 
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: () => ({}),
});