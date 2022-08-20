import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const getListProject = createAsyncThunk(
  '/project/getList',
  async (thunkApi, params) => {
    const projectList = await axiosClient.get('/project', {
      headers: {
        authorization: `Bearer ${params.token}`,
        withCredentials: true,
      },
    });
    return projectList;
  }
);
