/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Components/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
