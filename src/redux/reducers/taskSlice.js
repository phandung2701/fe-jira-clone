import { createSlice } from '@reduxjs/toolkit';
import { getListProject } from '../action/projectAction';

const taskSlice = createSlice({
  name: 'project',
  initialState: {
    taskDetail: {},
    taskList: [],
  },
  reducers: {
    setTaskList: (state, action) => {
      return { ...state, taskList: action.payload };
    },
    setTaskDetail: (state, action) => {
      return { ...state, taskDetail: action.payload };
    },
  },
  extraReducers: {},
});

export const { reducer: taskReducer } = taskSlice;
export const { setTaskList, setTaskDetail } = taskSlice.actions;
