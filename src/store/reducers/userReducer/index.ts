import { TYPES } from './typesOfAction';

export interface UserState {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  loading: boolean;
  isAuth: boolean;
  tokenData: { accessToken: string };
}

interface ActionPayload {
  type: string;
  payload: Partial<UserState>;
}

const initialState: UserState = {
  _id: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  loading: false,
  isAuth: false,
  tokenData: { accessToken: '' },
};

// eslint-disable-next-line default-param-last
export const userReducer = (state = initialState, action: ActionPayload) => {
  switch (action?.type) {
    case TYPES.LOGIN: {
      return { ...state, ...action.payload };
    }
    case TYPES.SET_CREDENTIALS: {
      return { ...state, ...action.payload };
    }
    case TYPES.SET_REGISTRATION_CREDENTIALS: {
      return { ...state, ...action.payload };
    }
    case TYPES.SET_LOADING: {
      return { ...state, loading: true };
    }
    case TYPES.SET_USER_FAILURE: {
      return { ...state, loading: false, isAuth: false };
    }
    case TYPES.SET_USER_SUCCESS: {
      return { ...state, loading: false, isAuth: true };
    }
    default:
      return state;
  }
};
