import axios from 'axios';
import * as R from 'ramda';
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

export const updateTask = (action) => {
  return axios.patch(`${tasksUrl}/${action.id}`, R.omit(['id', 'type'], action))
    .then((response) => response.data)
    .catch((error) => error.data);
};
