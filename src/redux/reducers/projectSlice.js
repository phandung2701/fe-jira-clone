import { createSlice } from '@reduxjs/toolkit';
import { getListProject } from '../action/projectAction';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projectItem: {},
    projectList: [],
  },
  reducers: {},
  extraReducers: {
    [getListProject.pending]: (state) => state,
    [getListProject.fulfilled]: (state, action) => ({
      ...state,
      projectList: action.payload,
    }),
    [getListProject.rejected]: (state) => state,
  },
});

export const { reducer: projectReducer } = projectSlice;
