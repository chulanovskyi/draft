import { call, put, takeEvery} from 'redux-saga/effects';
import * as todoApi from './todoApi';
import {
  GET_TASKS, GET_TASKS_DONE, GET_TASKS_ERROR,
  ADD_TASK, ADD_TASK_DONE, ADD_TASK_ERROR,
  REMOVE_TASK, REMOVE_TASK_DONE, REMOVE_TASK_ERROR,
} from "./todoActions";

function* getTodos(action) {
  try {
    const tasks = yield call(todoApi.getTasks, action);
    yield put({type: GET_TASKS_DONE, tasks});
  } catch (e) {
    yield put({type: GET_TASKS_ERROR, message: e.message});
  }
}

function* addTodo(action) {
  try {
    const task = yield call(todoApi.addTask, action);
    yield put({type: ADD_TASK_DONE, task});
  } catch (e) {
    yield put({type: ADD_TASK_ERROR, message: e.message});
  }
}

function* removeTodo(action) {
  try {
    const task = yield call(todoApi.removeTask, action);
    if (task.count === 1) {
      yield put({type: GET_TASKS});
    }
  } catch (e) {
    yield put({type: REMOVE_TASK_ERROR, message: e.message});
  }
}

function* todoSaga() {
  yield takeEvery(GET_TASKS, getTodos);
  yield takeEvery(ADD_TASK, addTodo);
  yield takeEvery(REMOVE_TASK, removeTodo);
}

export default todoSaga;
