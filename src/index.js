import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import DraftApp from './containers/draftApp';
import configureStore from './store/configureStore';
import D3HomeWork from "./components/d3HomeWork/d3HomeWork";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={DraftApp}/>
      <Route path='/homework' component={D3HomeWork}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
