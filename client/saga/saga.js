import {all, fork} from 'redux-saga/effects';
import todoSaga from '../components/todoList/todoSaga';

export default function* root() {
  yield all([
      fork(todoSaga),
    ]
  );
}
