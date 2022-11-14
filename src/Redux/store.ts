import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {},
  devTools: process.env.NODE_ENV !== 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
