/* eslint-disable import/prefer-default-export */
// import { apiSlice } from '../../App/Api/apiSlice';

import { apiSlice } from '../../App/Api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
