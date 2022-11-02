import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    // ? Add the authReducer to the reducer object
    authUser: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
