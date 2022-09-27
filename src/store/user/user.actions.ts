import { createAction } from 'typesafe-actions';
import { UserReducer } from './user.reducer';
import { TYPES } from './typesOfAction';

export const userLoginAction = createAction(TYPES.LOGIN, (userData: string) => userData)();

export const userRegistrationAction = createAction(
  TYPES.SET_REGISTRATION_CREDENTIALS,
  (userData: Omit<UserReducer, 'tokenData' | 'isAuth' | 'loading' | '_id'>) => userData,
)();

export const clearStateAction = createAction(TYPES.CLEAR_STATE)();
