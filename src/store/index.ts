import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { userReducer } from './user/user.reducer';
import { rootSaga } from './rootSaga';
import { postReducer } from './post/post.reducer';

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
