import { projectList } from '../redux/reducers/projectSlice';

export const updateProject = async (axios, id, data) => {
  const project = await axios.patch(`/project/${id}`, data);
  return project.data;
};

export const deleteProject = async (axios, id) => {
  const project = await axios.delete(`/project/${id}`);
  return project.data;
};

export const getListProject = async (axios, dispatch) => {
  const projects = await axios.get(`/project`);
  return dispatch(projectList(projects.data));
};

export const createProject = async (axios, data) => {
  const project = await axios.post('/project', data);
  return project.data;
};
