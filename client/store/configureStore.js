import { createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga/lib';
import RootReducer from '../reducers';
import rootSaga from "../saga/saga";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  	const store = createStore(RootReducer, initialState, applyMiddleware(sagaMiddleware));

  	if (module.hot) {
    	module.hot.accept('../reducers', () => {
      		const nextRootReducer = require('../reducers');
      		store.replaceReducer(nextRootReducer);
    	});
  	}

  store.runSaga = sagaMiddleware.run(rootSaga);

  return store;
}
