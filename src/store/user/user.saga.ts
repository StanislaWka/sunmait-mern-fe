import { call, put, takeEvery } from 'redux-saga/effects';
import { UserReducer } from 'store/user/user.reducer';
import { TYPES } from 'store/user/typesOfAction';
import { requestLoginUser, requestRegisterUser } from 'api/agents';
import { snackActions } from 'utils';
import { AxiosError } from 'axios';
import { selectState } from '../selector';

export function* registrationUser() {
  try {
    const state: UserReducer = yield selectState((s) => s.userReducer);
    const { email, password, name, surname } = state;

    const result: { data: UserReducer } = yield call(requestRegisterUser, {
      email,
      password,
      name,
      surname,
    });

    yield put({
      type: TYPES.SET_CREDENTIALS,
      payload: result.data,
    });

    yield put({
      type: TYPES.SET_LOADING,
      payload: {},
    });
  } catch (e) {
    console.error(e);
    yield put({ type: TYPES.SET_USER_FAILURE });
    snackActions.error((e as AxiosError).message);
  }
}

export function* loginUser() {
  try {
    const state: UserReducer = yield selectState((s) => s.userReducer);
    const { email, password } = state;

    const result: { data: UserReducer } = yield call(requestLoginUser, { email, password });

    localStorage.setItem('accessToken', result.data.tokenData.accessToken);

    yield put({
      type: TYPES.SET_CREDENTIALS,
      payload: result.data,
    });

    yield put({
      type: TYPES.SET_USER_SUCCESS,
      payload: {},
    });
  } catch (e) {
    console.error(e);
    yield put({ type: TYPES.SET_USER_FAILURE });
    snackActions.error((e as AxiosError).message);
  }
}

export default function* userSaga() {
  yield takeEvery(TYPES.LOGIN, loginUser);
  yield takeEvery(TYPES.SET_REGISTRATION_CREDENTIALS, registrationUser);
}