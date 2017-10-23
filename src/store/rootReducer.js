import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import todoReducer from '../components/todoList/todoReducer';

const rootReducer = combineReducers({
  routing,
  todoReducer,
});

export default rootReducer;
