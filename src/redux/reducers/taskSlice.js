import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'project',
  initialState: {
    taskDetail: {},
    taskList: [],
    taskSearch: [],
  },
  reducers: {
    setTaskList: (state, action) => {
      return { ...state, taskList: action.payload };
    },
    setTaskSearch: (state, action) => {
      return { ...state, taskSearch: action.payload };
    },
    setTaskDetail: (state, action) => {
      return { ...state, taskDetail: action.payload };
    },
  },
  extraReducers: {},
});

export const { reducer: taskReducer } = taskSlice;
export const { setTaskList, setTaskDetail, setTaskSearch } = taskSlice.actions;
