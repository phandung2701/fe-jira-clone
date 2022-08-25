import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { modalReducer } from './reducers/modalSlice';
import { projectReducer } from './reducers/projectSlice';
import { taskReducer } from './reducers/taskSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  project: projectReducer,
  task: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
