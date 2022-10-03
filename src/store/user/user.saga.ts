import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { UserReducer } from 'store/user/user.reducer';
import { requestLoginUser, requestRegisterUser } from 'api/agents';
import { snackActions } from 'utils';
import { setLoadingAction } from 'store/post/post.actions';
import { AxiosError } from 'axios';
import {
  setUserCredentialsAction,
  setUserFailureAction,
  setUserSuccessAction,
  userLoginAction,
  userRegistrationAction,
} from './user.actions';

export function* registrationUser({ payload }: ActionType<typeof userRegistrationAction>) {
  const { email, password, name, surname } = payload;
  try {
    const result: { data: UserReducer } = yield call(requestRegisterUser, {
      email,
      password,
      name,
      surname,
    });

    yield put(setUserCredentialsAction(result.data));

    yield put(setLoadingAction());
  } catch (e) {
    console.error(e);
    yield put(setUserFailureAction());
    snackActions.error((e as AxiosError).message);
  }
}

export function* loginUser({ payload }: ActionType<typeof userLoginAction>) {
  const { email, password } = payload;
  try {
    const result: { data: UserReducer } = yield call(requestLoginUser, { email, password });

    localStorage.setItem('accessToken', result.data.tokenData.accessToken);

    yield put(setUserCredentialsAction(result.data));

    yield put(setUserSuccessAction());
  } catch (e) {
    console.error(e);
    yield put(setUserFailureAction());
    snackActions.error((e as AxiosError).message);
  }
}

export default function* userSaga() {
  yield takeEvery(userLoginAction, loginUser);
  yield takeEvery(userRegistrationAction, registrationUser);
}
