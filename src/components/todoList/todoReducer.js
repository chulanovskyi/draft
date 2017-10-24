import * as R from 'ramda';
import {
  GET_TASKS_DONE, ADD_TASK_DONE, REMOVE_TASK_DONE, UPDATE_TASK_DONE,
  FILTER_TASKS, APPLY_OPTIONS_DONE,
} from './constants/actionTypes';

export const initialState = {
  tasks: [{
    name: 'read book',
    isActive: true,
    id: 0,
    history: [{
      changedAt: "2017-10-19T12:39:10.863Z",
      prop: "name",
      from: "",
      to: "read book"
    }],
  }],
  show: 'all',
};

function todoReducer(state = initialState, action) {
  switch (action.type) {

  case GET_TASKS_DONE:
    return {...state, tasks: action.tasks};

  case ADD_TASK_DONE:
    return R.mergeAll([
      R.dissoc('tasks', state),
      {tasks: R.append(action.task, state.tasks)},
    ]);

  case REMOVE_TASK_DONE:
    return state;

  case UPDATE_TASK_DONE:
    const ind = R.findIndex(R.propEq('id', action.task.id))(state.tasks);
    return R.mergeAll([
      R.dissoc('tasks', state),
      {tasks: R.update(ind, action.task, state.tasks)},
    ]);

  case FILTER_TASKS:
    return {...state, show: action.isActive};

  case APPLY_OPTIONS_DONE:
    return {...state, tasks: action.applied};

  default:
    return state;
  }
}

export default todoReducer;
