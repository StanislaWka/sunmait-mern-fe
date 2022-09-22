import { UserState } from '../userReducer';
import { POST_TYPES } from './typesOfActions';

export interface PostState {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  imageUrl: string;
  user: Partial<UserState>;
}

interface PostReducerState {
  deleteId: string;
  posts: PostState[];
  currentPost: Partial<PostState>;
  loading: boolean;
}

interface ActionPayload {
  type: string;
  payload: Partial<{
    deleteId: string;
    posts: PostState[];
    currentPost: Partial<PostState>;
    loading: boolean;
  }>;
}

const initialState: PostReducerState = {
  deleteId: '',
  posts: [],
  currentPost: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export const postReducer = (state = initialState, action: ActionPayload) => {
  switch (action?.type) {
    case POST_TYPES.SET_ALL: {
      return { ...state, ...action.payload };
    }
    case POST_TYPES.SET_LOADING: {
      return { ...state, loading: true };
    }
    case POST_TYPES.SET_LOADING_SUCCESS: {
      return { ...state, loading: false };
    }
    case POST_TYPES.SET_LOADING_FAILURE: {
      return { ...state, loading: false };
    }
    case POST_TYPES.DELETE: {
      return { ...state, ...action.payload };
    }
    case POST_TYPES.CREATE: {
      return { ...state, ...action.payload };
    }
    case POST_TYPES.SET_ONE: {
      return { ...state, ...action.payload };
    }
    case POST_TYPES.GET_ONE: {
      return { ...state, ...action.payload };
    }
    case POST_TYPES.CLEAR_CURRENT: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
