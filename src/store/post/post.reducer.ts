import { AxiosError } from 'axios';
import { RootActions } from 'store/actions';
import { TagData } from 'store/tag/tag.reducer';
import { createReducer } from 'typesafe-actions';
import { UserReducer } from '../user/user.reducer';
import * as ACTIONS from './post.actions';

const LIMIT = 5;
const FIRST_PAGE = 1;

export interface PostState {
  _id: string;
  title: string;
  text: string;
  tags: TagData[];
  viewsCount: number;
  imageUrl: string;
  user: Partial<UserReducer>;
}

export interface CurrentPostData extends Omit<PostState, 'tags'> {
  tags: string[];
}

export interface Filter {
  type: string;
  value: string;
}

interface PostReducer {
  deleteId: string;
  posts: PostState[];
  currentPost: Partial<CurrentPostData>;
  loading: boolean;
  error?: AxiosError;
  count: number;
  limit: number;
  page: number;
  deleteTagId?: string;
  userId?: string;
  filter?: string;
  order?: string;
  tagsId?: string[];
}

const initialState: PostReducer = {
  deleteId: '',
  posts: [],
  currentPost: {},
  loading: false,
  error: undefined,
  limit: LIMIT,
  page: FIRST_PAGE,
  count: 0,
  tagsId: [],
};

export const postReducer = createReducer<PostReducer, RootActions>(initialState)
  .handleAction(ACTIONS.getAllPostsAction, (state) => state)
  .handleAction(ACTIONS.getOnePostAction, (state, { payload }) => ({ ...state, ...payload }))
  .handleAction(ACTIONS.setDeleteIdPostAction, (state, { payload }) => ({
    ...state,
    ...payload,
    posts: state.posts.filter((post) => post._id !== payload.deleteId),
  }))
  .handleAction(ACTIONS.createPostAction, (state, { payload }) => ({ ...state, ...payload }))
  .handleAction(ACTIONS.setCurrentPostAction, (state, { payload }) => ({ ...state, ...payload }))
  .handleAction(ACTIONS.setAllAction, (state, { payload }) => ({ ...state, posts: payload }))
  .handleAction(ACTIONS.setLoadingAction, (state) => ({ ...state, loading: true }))
  .handleAction(ACTIONS.setLoadingFailureAction, (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
  }))
  .handleAction(ACTIONS.setLoadingSuccessAction, (state) => ({ ...state, loading: false }))
  .handleAction(ACTIONS.clearCurrentPostACtion, (state) => ({ ...state, currentPost: {} }))
  .handleAction(ACTIONS.setNewPostAction, (state, { payload }) => {
    if (state.posts.length === state.limit) {
      state.posts.splice(state.limit - 1, 1);
    }
    return {
      ...state,
      posts: [payload, ...state.posts],
    };
  })
  .handleAction(ACTIONS.setCountAction, (state, { payload }) => ({ ...state, count: payload }))
  .handleAction(ACTIONS.setPageAction, (state, { payload }) => ({ ...state, page: payload }))
  .handleAction(ACTIONS.deleteTagAction, (state, { payload }) => ({
    ...state,
    deleteTagId: payload,
  }))
  .handleAction(ACTIONS.setUserPostsAction, (state, { payload }) => ({
    ...state,
    userId: payload,
  }))
  .handleAction(ACTIONS.setFilterAction, (state, { payload }) => ({ ...state, filter: payload }))
  .handleAction(ACTIONS.setOrderAction, (state, { payload }) => ({ ...state, order: payload }))
  .handleAction(ACTIONS.setTagsIdAction, (state, { payload }) => ({ ...state, tagsId: payload }));
