import { createReducer } from 'typesafe-actions';
import { RootActions } from '../actions';
import * as ACTIONS from './user.actions';

export interface UserReducer {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  loading: boolean;
  isAuth: boolean;
  tokenData: { accessToken: string };
  roleId: { _id: string; name: string };
}

const initialState: UserReducer = {
  _id: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  loading: false,
  isAuth: false,
  tokenData: { accessToken: '' },
  roleId: { _id: '', name: '' },
};

export const userReducer = createReducer<UserReducer, RootActions>(initialState)
  .handleAction(ACTIONS.clearStateAction, (state) => initialState)
  .handleAction(ACTIONS.setUserCredentialsAction, (state, { payload }) => ({
    ...state,
    ...payload,
  }))
  .handleAction(ACTIONS.setLoadingAction, (state) => ({ ...state, loading: true }))
  .handleAction(ACTIONS.setUserFailureAction, (state) => ({
    ...state,
    loading: false,
    isAuth: false,
  }))
  .handleAction(ACTIONS.setUserSuccessAction, (state) => ({
    ...state,
    loading: false,
    isAuth: true,
  }))
  .handleAction(ACTIONS.setUserIdAndRoleAction, (state, { payload }) => ({ ...state, ...payload }));
