import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const login = createAsyncThunk(
  'auth/login',
  async (params, thunkApi) => {
    const data = await axiosClient.post('/v1/auth/login', params);
    return data;
  }
);
export const register = createAsyncThunk(
  'auth/register',
  async (params, thunkApi) => {
    const data = await axiosClient.post('/v1/auth/register', params);
    return data;
  }
);
export const verifyAccount = createAsyncThunk(
  'auth/verify',
  async (params, thunkApi) => {
    const data = await axiosClient.post('/v1/auth/verifyAccount', params);
    return data;
  }
);
