import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { userReducer } from './reducers/userReducer';
import { rootSaga } from './sagas';
import { postReducer } from './reducers/postReducer';

export const rootReducer = combineReducers({ userReducer, postReducer });

export const saga = createSagaMiddleware();

export const store = () => {
  const Store = createStore(
    rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(saga)),
  );
  // use the same saga middleware that you have enhanced your store with
  saga.run(rootSaga);
  return Store;
};
