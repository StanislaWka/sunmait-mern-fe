import { AxiosError } from 'axios';
import { RootActions } from 'store/actions';
import { TagData } from 'store/tag/tag.reducer';
import { createReducer } from 'typesafe-actions';
import { UserReducer } from '../user/user.reducer';
import * as ACTIONS from './post.actions';

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
  posts: PostState[];
  currentPost: Partial<CurrentPostData>;
  loading: boolean;
  error?: AxiosError;
  count: number;
  userId?: string;
  filter?: string;
  order?: string;
  tagsId?: string[];
  page?: number;
}

const initialState: PostReducer = {
  posts: [],
  currentPost: {},
  loading: false,
  error: undefined,
  count: 0,
};

export const postReducer = createReducer<PostReducer, RootActions>(initialState)
  .handleAction(ACTIONS.getAllPostsAction, (state) => state)
  .handleAction(ACTIONS.setDeleteIdPostAction, (state, { payload }) => ({
    ...state,
    ...payload,
    posts: state.posts.filter((post) => post._id !== payload.deleteId),
  }))
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
  .handleAction(ACTIONS.setCountAction, (state, { payload }) => ({ ...state, count: payload }))
  .handleAction(ACTIONS.setPageAction, (state, { payload }) => ({ ...state, page: payload }))
  .handleAction(ACTIONS.deleteTagAction, (state, { payload }) => ({
    ...state,
    deleteTagId: payload,
  }))
  .handleAction(ACTIONS.setFilterAction, (state, { payload }) => ({ ...state, filter: payload }))
  .handleAction(ACTIONS.setOrderAction, (state, { payload }) => ({ ...state, order: payload }))
  .handleAction(ACTIONS.setTagsIdAction, (state, { payload }) => ({ ...state, tagsId: payload }))
  .handleAction(ACTIONS.deleteTagFromPostsAction, (state, { payload }) => ({
    ...state,
    posts: state.posts.map((post) => {
      post.tags = post.tags.filter((tag) => tag._id !== payload);
      return post;
    }),
  }));
