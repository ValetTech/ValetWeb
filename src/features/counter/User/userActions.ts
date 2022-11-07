/* eslint-disable import/prefer-default-export */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserRegisterAsync } from '../../../Services/ApiServices';

// user/register
const registerUser = createAsyncThunk(
  // action type string
  'user/register',
  // callback function
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      // make request to backend
      await UserRegisterAsync(username, email, password);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
export default registerUser;
