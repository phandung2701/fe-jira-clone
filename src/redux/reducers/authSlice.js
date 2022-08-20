import { createSlice } from '@reduxjs/toolkit';
import { login, register, verifyAccount } from '../action/authActions';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    success: '',
    accessToken: '',
    refreshToken: '',
    error: '',
  },
  reducers: {
    isLogout: (state, action) => {
      return { ...state, accessToken: action.payload, refreshToken: '' };
    },
    updateToken: (state, action) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      return state;
    },
    [login.rejected]: (state, action) => {
      return { ...state, error: 'incorrect email or password' };
    },
    [login.fulfilled]: (state, action) => {
      return {
        ...state,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        error: '',
      };
    },
    [register.pending]: (state) => {
      return state;
    },
    [register.rejected]: (state, action) => {
      return { ...state, error: action.error };
    },
    [register.fulfilled]: (state, action) => {
      return {
        ...state,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        error: '',
      };
    },
    [verifyAccount.pending]: (state) => {
      return state;
    },
    [verifyAccount.rejected]: (state, action) => {
      return { ...state, error: action.error };
    },
    [verifyAccount.fulfilled]: (state, action) => {
      return state;
    },
  },
});

export const { reducer: authReducer } = AuthSlice;
export const { isLogout, updateToken } = AuthSlice.actions;
