export const GET_TASKS = 'GET_TASKS';
export const GET_TASKS_DONE = 'GET_DONE';
export const GET_TASKS_ERROR = 'GET_ERROR';
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_DONE = 'ADD_TASK_DONE';
export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';
export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_TASK_DONE = 'REMOVE_TASK_DONE';
export const REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR';
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_TASK_DONE = 'UPDATE_TASK_DONE';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';
export const FILTER_TASKS = 'FILTER_TASKS';

export function getTasks() {
  return {
    type: GET_TASKS,
  }
}

export function addTask(name) {
  return {
    type: ADD_TASK,
    name: name,
  }
}

export function removeTask(taskId) {
  return {
    type: REMOVE_TASK,
    taskId: taskId,
  }
}

export function updateTask(task) {
  return {
    type: UPDATE_TASK,
    id: task.id,
    isActive: task.isActive,
    name: task.name,
  }
}

export function filterTasks(isActive) {
  return {
    type: FILTER_TASKS,
    isActive: isActive,
  }
}
