import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from 'store/modules/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicsMiddleware = createEpicMiddleware(rootEpic);

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicsMiddleware)),
);
