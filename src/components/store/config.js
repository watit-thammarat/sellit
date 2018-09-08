import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middlewares = [thunk];

let reduxCompose = compose;

if (__DEV__) {
  reduxCompose = reduxCompose(
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  );
}

export default () =>
  createStore(reducer, {}, reduxCompose(applyMiddleware(...middlewares)));
