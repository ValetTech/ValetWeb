/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import loadState from '../LocalStorage/localStorage';

function saveState(state: any){
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const localUser = loadState();
console.log(localUser);

const authSlice = createSlice({
  name: 'auth',
  initialState: localUser,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken

      saveState(state);
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
      saveState({user: null, accessToken: null,});
      console.log(state)
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;