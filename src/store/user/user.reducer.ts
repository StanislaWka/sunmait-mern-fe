import { createReducer } from 'typesafe-actions';
import { RootActions } from '../actions';
import { userLoginAction, userRegistrationAction, clearStateAction } from './user.actions';
// import { TYPES } from './typesOfAction';

export interface UserReducer {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  loading: boolean;
  isAuth: boolean;
  tokenData: { accessToken: string };
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
};

export const userReducer = createReducer<UserReducer, RootActions>(initialState)
  .handleAction(clearStateAction, (state) => initialState)
  .handleAction(userLoginAction, (state, { payload }) => ({ ...state }))
  .handleAction(userRegistrationAction, (state, { payload }) => ({ ...state, ...payload }));

// // eslint-disable-next-line default-param-last
// export const userReducer = (state = initialState, action: ActionPayload) => {
//   switch (action?.type) {
//     case TYPES.LOGIN: {
//       return { ...state, ...action.payload };
//     }
//     case TYPES.SET_CREDENTIALS: {
//       return { ...state, ...action.payload };
//     }
//     case TYPES.SET_REGISTRATION_CREDENTIALS: {
//       return { ...state, ...action.payload };
//     }
//     case TYPES.SET_LOADING: {
//       return { ...state, loading: true };
//     }
//     case TYPES.SET_USER_FAILURE: {
//       return { ...state, loading: false, isAuth: false };
//     }
//     case TYPES.SET_USER_SUCCESS: {
//       return { ...state, loading: false, isAuth: true };
//     }
//     case TYPES.CLEAR_STATE: {
//       return initialState;
//     }
//     default:
//       return state;
//   }
// };
