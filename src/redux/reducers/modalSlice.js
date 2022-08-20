import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalIssues: false,
    createTask: false,
    taskDetail: false,
  },
  reducers: {
    showModalIssues: (state) => {
      return { ...state, modalIssues: true };
    },
    closeModalIssues: (state) => {
      return { ...state, modalIssues: false };
    },
    showCreateTask: (state) => {
      return { ...state, createTask: true };
    },
    closeCreateTask: (state) => {
      return { ...state, createTask: false };
    },
    showTaskDetail: (state) => {
      return { ...state, taskDetail: true };
    },
    closeTaskDetail: (state) => {
      return { ...state, taskDetail: false };
    },
  },
});

export const { reducer: modalReducer } = modalSlice;

export const {
  showModalIssues,
  closeModalIssues,
  showCreateTask,
  closeCreateTask,
  showTaskDetail,
  closeTaskDetail,
} = modalSlice.actions;
