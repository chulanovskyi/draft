import axios from 'axios';
import API from '../../config/apiConfig';
const tasksUrl = `${API.host}/tasks`;

export const getTasks = () => {
  return axios.get(tasksUrl)
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const addTask = ({name}) => {
  return axios.post(tasksUrl, {name: name})
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const removeTask = ({taskId}) => {
  return axios.delete(`${tasksUrl}/${taskId}`)
    .then((response) => response.data)
    .catch((error) => error.data);
};
