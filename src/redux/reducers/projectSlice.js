import { createSlice } from '@reduxjs/toolkit';
import { getListProject } from '../action/projectAction';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projectItem: {},
    projectList: [],
  },
  reducers: {
    projectList: (state, action) => {
      return { ...state, projectList: action.payload };
    },
    setProjectItem: (state, action) => {
      return { ...state, projectItem: action.payload };
    },
  },
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
export const { projectList, setProjectItem } = projectSlice.actions;
