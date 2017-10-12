export const GET_TASKS = 'GET_TASKS';
export const GET_TASKS_DONE = 'GET_DONE';
export const GET_TASKS_ERROR = 'GET_ERROR';
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_DONE = 'ADD_TASK_DONE';
export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';
export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_TASK_DONE = 'REMOVE_TASK_DONE';
export const REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const TOGGLE_TASK_DONE = 'TOGGLE_TASK_DONE';
export const TOGGLE_TASK_ERROR = 'TOGGLE_TASK_ERROR';

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

export function toggleTask(taskId, isActive) {
  return {
    type: TOGGLE_TASK,
    taskId: taskId,
    isActive: isActive,
  }
}
