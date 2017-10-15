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
  const task = {
    name: name,
    history: [{
      from: '',
      to: name,
    }]
  };
  return axios.post(tasksUrl, task)
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const removeTask = ({taskId}) => {
  return axios.delete(`${tasksUrl}/${taskId}`)
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const updateTask = (action) => {
  const task = R.omit(['id', 'type', 'newName'], action);
  task.history.push({from: action.name, to: action.newName});
  return axios.patch(`${tasksUrl}/${action.id}`, task)
    .then((response) => response.data)
    .catch((error) => error.data);
};
