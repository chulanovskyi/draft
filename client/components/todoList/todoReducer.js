import * as R from 'ramda';
import {GET_TASKS_DONE, ADD_TASK_DONE, REMOVE_TASK_DONE, TOGGLE_TASK_DONE} from './todoActions';

const initialState = {
  tasks: [],
};

function rootReducer(state = initialState, action) {
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

  case TOGGLE_TASK_DONE:
    const ind = R.findIndex(R.propEq('id', action.task.id))(state.tasks);
    return R.mergeAll([
      R.dissoc('tasks', state),
      {tasks: R.update(ind, action.task, state.tasks)},
    ]);

  default:
    return state;
  }
}

export default rootReducer;
