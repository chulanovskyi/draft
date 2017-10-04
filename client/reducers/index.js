import R from 'ramda';
import {WELCOME_TEXT} from '../constants';
import {GET_STARTED} from '../actions';
import {GET_TASKS_DONE, ADD_TASK_DONE, REMOVE_TASK_DONE} from '../components/todoList/todoActions';

const initialState = {
  welcomeText: 'No hello',
  tasks: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
  case GET_STARTED:
    return {...state, welcomeText: WELCOME_TEXT};
  case GET_TASKS_DONE:
    return {...state, tasks: action.tasks};
  case ADD_TASK_DONE:
    return R.mergeAll([
      R.dissoc('tasks', state),
      {tasks: R.append(action.task, state.tasks)},
    ]);
  case REMOVE_TASK_DONE:
    return state;
  default:
    return state;
  }
}

export default rootReducer;
