import { setTaskDetail, setTaskList } from '../redux/reducers/taskSlice';

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
  const task = await axios.patch(`/task/${id}`,data);
  if (task) {
    dispatch(setTaskDetail(task.data));
  }
};
