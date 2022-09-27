/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { all, takeEvery, spawn } from '@redux-saga/core/effects';
import axios from 'axios';
import { API_V1_ROUTE } from 'constants/apiRoutes';
import { userLogin } from './user/user.actions';
import postSaga from './post/post.saga';
import userSaga from './user/user.saga';

interface UserLoginData {
  email: string;
  password: string;
}

const beUrl = process.env.NODE_ENV === 'production' ? API_V1_ROUTE : 'http:/localhost:8000';

export function* rootSaga() {
  const sagas = [userSaga, postSaga];

  yield all(sagas.map((s) => spawn(s)));
}
