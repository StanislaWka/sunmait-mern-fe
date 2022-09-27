import { createAction } from 'typesafe-actions';
import { POST_TYPES } from './typesOfActions';

export const getAllPostsAction = createAction(POST_TYPES.GET_ALL)();

export const getOnePostAction = createAction(POST_TYPES.GET_ONE, (id: string) => ({
  currentPost: { _id: id },
}))();

export const deletePostAction = createAction(POST_TYPES.DELETE, (id: string) => ({
  deleteId: id,
}))();

export const createPostAction = createAction(POST_TYPES.CREATE, (title: string, text: string) => ({
  currentPost: { title, text },
}));
