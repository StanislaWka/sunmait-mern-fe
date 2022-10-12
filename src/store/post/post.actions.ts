import { AxiosError } from 'axios';
import { createAction } from 'typesafe-actions';
import { CurrentPostData, PostState } from './post.reducer';
import POST_TYPES from './post.types';

export const getAllPostsAction = createAction(
  POST_TYPES.GET_ALL,
  (limit: number, page: number) => ({
    limit,
    page,
  }),
)();

export const getOnePostAction = createAction(POST_TYPES.GET_ONE, (id: string) => ({
  currentPost: { _id: id },
}))();

export const setDeleteIdPostAction = createAction(POST_TYPES.DELETE, (id: string) => ({
  deleteId: id,
}))();

export const createPostAction = createAction(
  POST_TYPES.CREATE,
  (title: string, text: string, tags: string[]) => ({
    currentPost: { title, text, tags },
  }),
)();

export const setCurrentPostAction = createAction(POST_TYPES.SET_ONE, (post: CurrentPostData) => ({
  currentPost: post,
}))();

export const setNewPostAction = createAction(
  POST_TYPES.SET_NEW_POST,
  (newPost: PostState) => newPost,
)();

export const setAllAction = createAction(POST_TYPES.SET_ALL, (posts: PostState[]) => posts)();

export const setLoadingAction = createAction(POST_TYPES.SET_LOADING)();

export const setLoadingSuccessAction = createAction(POST_TYPES.SET_LOADING_SUCCESS)();

export const setLoadingFailureAction = createAction(
  POST_TYPES.SET_LOADING_FAILURE,
  (error: AxiosError) => error,
)();

export const deleteTagAction = createAction(POST_TYPES.DELETE_TAG, (id: string) => id)();

export const setCountAction = createAction(POST_TYPES.SET_COUNT, (count: number) => count)();

export const setPageAction = createAction(POST_TYPES.SET_PAGE, (page: number) => ({ page }))();

export const clearCurrentPostACtion = createAction(POST_TYPES.CLEAR_CURRENT)();

export const setUserPostsAction = createAction(
  POST_TYPES.SET_USER_POSTS,
  (limit: number, page: number) => ({
    limit,
    page,
  }),
)();

export const setFilterAction = createAction(POST_TYPES.SET_FILTER, (filter: string) => filter)();
export const setOrderAction = createAction(POST_TYPES.SET_ORDER, (order: string) => order)();
export const setTagsIdAction = createAction(POST_TYPES.SET_TAGS_ID, (tagsId: string[]) => tagsId)();
export const deleteTagFromPostsAction = createAction(
  POST_TYPES.DELETE_TAG_FROM_POSTS,
  (tagId: string) => tagId,
)();
