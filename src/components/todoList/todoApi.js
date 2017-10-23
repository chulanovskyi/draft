import axios from 'axios';
import * as R from 'ramda';
import API from '../../config/apiConfig';
const tasksUrl = `${API.host}/tasks`;
const NAME_PROP = 'name';
const STATUS_PROP = 'isActive';

export const getTasks = () => {
  return axios.get(tasksUrl)
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const addTask = ({name}) => {
  const task = {
    name: name,
    history: [{
      prop: NAME_PROP,
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
  const task = R.omit(['id', 'type', 'newName', 'newStatus'], action);
  if (action.newName) {
    task.history.push({prop: NAME_PROP, from: action.name, to: action.newName});
    task.name = action.newName;
  }
  if (action.newStatus !== undefined) {
    task.history.push({prop: STATUS_PROP, from: action.isActive, to: action.newStatus});
    task.isActive = action.newStatus;
  }
  return axios.patch(`${tasksUrl}/${action.id}`, task)
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const applyOptions = ({options}) => {
  return axios.get(`${tasksUrl}/filter`, {params: options})
    .then((response) => response.data)
    .catch((error) => error.data);
};
