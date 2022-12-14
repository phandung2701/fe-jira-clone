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

export const deleteTask = async (axios, id, idProject, dispatch) => {
  const task = await axios.delete(`/task/${id}`);
  if (task) {
    dispatch(getListTask(axios, idProject, dispatch));
  }
};

export const searchTask = async (axios, data, dispatch) => {
  const tasks = await axios.post('/v1/project/search', data);
  if (tasks) {
    dispatch(setTaskSearch(tasks.data.tasks));
  }
};

export const searchTaskKanban = async (axios, data, dispatch) => {
  const tasks = await axios.post('/v1/project/search', data);
  if (tasks) {
    dispatch(setTaskList(tasks.data.tasks));
  }
};

export const updatePosition = async (axios, data, dispatch) => {
  await axios.post('/v1/task/updatePosition', data);
  await getListTask(axios, data.idProject, dispatch);
};
