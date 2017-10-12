import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga/lib';
import rootSaga from "../saga/saga";
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history, initialState) {

  	const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  	if (module.hot) {
    	module.hot.accept('./rootReducer', () => {
      		const nextRootReducer = require('./rootReducer');
      		store.replaceReducer(nextRootReducer);
    	});
  	}

  store.runSaga = sagaMiddleware.run(rootSaga);

  return store;
}
