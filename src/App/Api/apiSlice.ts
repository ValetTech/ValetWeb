/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../Features/Auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://valetapi.azurewebsites.net/api/',
  credentials: 'include', // <-- Cookie will be sent back with every request
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // <-- Access token will be sent with every request
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrapper query wrapped around base query
// If token expires and request returns 403, this will handle reauthenticating and recieving another token
// If request does not return 403, nothing will happen
// Refresh endpoint needs to be added.
// ------------------------------------------------------------------------------
// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.originalStatus === 403) {
//     console.log('Sending refresh token...');
//     const refreshResult = await baseQuery('/refresh', api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result;
// };

// ---------------------------------------------------
// Endpoints specified in other extended api slices
// This allows more flexibilitiy for complex applications
export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
