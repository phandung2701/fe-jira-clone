import {
  setTaskDetail,
  setTaskList,
  setTaskSearch,
} from '../redux/reducers/taskSlice';

export const createTaskRequest = async (axios, data) => {
  const task = await axios.post('/task', data);
  return task.data;
};

export const getListTask = async (axios, id, dispatch) => {
  const taskList = await axios.get(`/v1/project/task/list/${id}`);
  if (taskList.data) {
    dispatch(setTaskList(taskList.data.tasks));
  }
};

export const taskDetail = async (axios, id, dispatch) => {
  const task = await axios.get(`/task/${id}`);
  if (task) {
    dispatch(setTaskDetail(task.data));
  }
};

export const updateTask = async (axios, id, data, dispatch) => {
  const task = await axios.patch(`/task/${id}`, data);
  if (task) {
    dispatch(setTaskDetail(task.data));
  }
};

export const searchTask = async (axios, data, dispatch) => {
  const tasks = await axios.post('/v1/project/search', data);
  if (tasks) {
    dispatch(setTaskSearch(tasks.data.tasks));
  }
};
