import { createAction } from 'typesafe-actions';
import { UserReducer } from './user.reducer';
import USERS_TYPES from './user.types';

export const userLoginAction = createAction(
  USERS_TYPES.LOGIN,
  (userData: Pick<UserReducer, 'email' | 'password'>) => userData,
)();

export const userRegistrationAction = createAction(
  USERS_TYPES.SET_REGISTRATION_CREDENTIALS,
  (userData: Omit<UserReducer, 'tokenData' | 'isAuth' | 'loading' | '_id'>) => userData,
)();

export const setUserCredentialsAction = createAction(
  USERS_TYPES.SET_CREDENTIALS,
  (userData: UserReducer) => userData,
)();

export const setUserIdAction = createAction(USERS_TYPES.SET_USER_ID, (_id: string) => _id)();

export const setUserFailureAction = createAction(USERS_TYPES.SET_USER_FAILURE)();

export const setLoadingAction = createAction(USERS_TYPES.SET_LOADING)();

export const clearStateAction = createAction(USERS_TYPES.CLEAR_STATE)();

export const setUserSuccessAction = createAction(USERS_TYPES.SET_USER_SUCCESS)();
