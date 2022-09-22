import { UserState } from '.';
import { TYPES } from './typesOfAction';

export function userLogin(userData: Partial<UserState>) {
  return {
    type: TYPES.LOGIN,
    payload: userData,
  };
}

export function userRegistration(userData: Partial<UserState>) {
  return {
    type: TYPES.SET_REGISTRATION_CREDENTIALS,
    payload: userData,
  };
}
