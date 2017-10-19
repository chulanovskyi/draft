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
export const APPLY_OPTIONS = 'APPLY_OPTIONS';
export const APPLY_OPTIONS_DONE = 'APPLY_OPTIONS_DONE';
export const APPLY_OPTIONS_ERROR = 'APPLY_OPTIONS_ERROR';
export const CLEAR_OPTIONS = 'CLEAR_OPTIONS';

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

export function updateTask({task, newName, newStatus}) {
  return {
    type: UPDATE_TASK,
    id: task.id,
    isActive: task.isActive,
    name: task.name,
    history: task.history,
    newName: newName,
    newStatus: newStatus,
  }
}

export function filterTasks(isActive) {
  return {
    type: FILTER_TASKS,
    isActive: isActive,
  }
}

export function applyOptions(options) {
  return {
    type: APPLY_OPTIONS,
    options: options
  }
}

export function clearOptions() {
  return {
    type: CLEAR_OPTIONS
  }
}
