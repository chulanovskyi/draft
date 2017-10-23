import { call, put, takeEvery} from 'redux-saga/effects';
import * as todoApi from './todoApi';
import {
  GET_TASKS, GET_TASKS_DONE, GET_TASKS_ERROR,
  ADD_TASK, ADD_TASK_DONE, ADD_TASK_ERROR,
  REMOVE_TASK, REMOVE_TASK_DONE, REMOVE_TASK_ERROR,
  UPDATE_TASK, UPDATE_TASK_DONE, UPDATE_TASK_ERROR,
  APPLY_OPTIONS, APPLY_OPTIONS_DONE, APPLY_OPTIONS_ERROR,
  CLEAR_OPTIONS,
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

function* updateTodo(action) {
  try {
    const task = yield call(todoApi.updateTask, action);
    yield put({type: UPDATE_TASK_DONE, task});
  } catch (e) {
    yield put({type: UPDATE_TASK_ERROR, message: e.message});
  }
}

function* applyTodoOptions(action) {
  try {
    const applied = yield call(todoApi.applyOptions, action);
    console.log(applied);
    yield put({type: APPLY_OPTIONS_DONE, applied});
  } catch (e) {
    yield put({type: APPLY_OPTIONS_ERROR, message: e.message});
  }
}

function* todoSaga() {
  yield takeEvery([GET_TASKS, CLEAR_OPTIONS], getTodos);
  yield takeEvery(ADD_TASK, addTodo);
  yield takeEvery(REMOVE_TASK, removeTodo);
  yield takeEvery(UPDATE_TASK, updateTodo);
  yield takeEvery(APPLY_OPTIONS, applyTodoOptions);
}

export default todoSaga;
