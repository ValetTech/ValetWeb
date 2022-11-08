/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from './Api/apiSlice';
import authReducer from '../Features/Auth/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
