/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RootState } from 'index';
import { createSelector } from 'reselect';

const currentPostState = (state: RootState) => state.postReducer.currentPost;
const postReducerState = (state: RootState) => state.postReducer;

export const selectTitleAndText = createSelector(currentPostState, (currentPost) => ({
  title: currentPost.title,
  text: currentPost.text,
}));

export const selectCurrentPost = createSelector(
  postReducerState,
  (postReducer) => postReducer.currentPost,
);

export const selectCount = createSelector(postReducerState, (postReducer) => postReducer.count);
export const selectPosts = createSelector(postReducerState, (postReducer) => postReducer.posts);
