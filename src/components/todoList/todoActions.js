import {
  GET_TASKS, ADD_TASK, REMOVE_TASK, UPDATE_TASK,
  FILTER_TASKS, APPLY_OPTIONS, CLEAR_OPTIONS,
} from "./constants/actionTypes";

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
