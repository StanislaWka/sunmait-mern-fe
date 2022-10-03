import {
  createPostRequest,
  deletePostRequest,
  getAllPostsRequest,
  getOnePostRequest,
  getUserPostsRequest,
} from 'api/agents/postService';
import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { CurrentPostData } from 'store/post/post.reducer';
import { ActionType } from 'typesafe-actions';
import { snackActions } from 'utils';

import { selectState } from '../selector';
import {
  clearCurrentPostACtion,
  createPostAction,
  getAllPostsAction,
  getOnePostAction,
  setAllAction,
  setCountAction,
  setCurrentPostAction,
  setDeleteIdPostAction,
  setFilterAction,
  setOrderAction,
  setPageAction,
  setTagsIdAction,
  setUserPostsAction,
} from './post.actions';

function* getAllPosts() {
  try {
    const limit: number = yield selectState((s) => s.postReducer.limit);
    const page: number = yield selectState((s) => s.postReducer.page);
    const filter: string = yield selectState((s) => s.postReducer.filter);
    const order: string = yield selectState((s) => s.postReducer.order);
    const tagsId: string[] = yield selectState((s) => s.postReducer.tagsId);
    const stringTags = tagsId.join(',');
    const posts: { data: any } = yield call(() =>
      getAllPostsRequest(limit, page, filter, order, stringTags),
    );
    yield put(setAllAction(posts.data[0].posts));
    yield put(setCountAction(posts.data[0].totalCount[0].count));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* getOnePost({ payload }: ActionType<typeof getOnePostAction>) {
  try {
    const currentPost: { data: CurrentPostData } = yield call(() =>
      getOnePostRequest(payload.currentPost._id),
    );

    yield put(setCurrentPostAction(currentPost.data));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* deletePost({ payload }: ActionType<typeof setDeleteIdPostAction>) {
  const { deleteId } = payload;
  try {
    yield call(() => deletePostRequest(deleteId));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* createPostSaga({ payload }: ActionType<typeof createPostAction>) {
  const newPost = payload.currentPost;
  try {
    // eslint-disable-next-line no-underscore-dangle
    const userId: string = yield selectState((s) => s.userReducer._id);
    yield call(() => createPostRequest({ ...newPost, userId }));

    yield getAllPosts();
    yield put(clearCurrentPostACtion());
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* getUserPosts() {
  try {
    const limit: number = yield selectState((s) => s.postReducer.limit);

    const page: number = yield selectState((s) => s.postReducer.page);
    const posts: { data: any } = yield call(() => getUserPostsRequest(limit, page));
    console.log(posts);
    yield put(setAllAction(posts.data[0].posts));
    yield put(setCountAction(posts.data[0].totalCount[0].count));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

export default function* postSaga() {
  yield takeEvery(
    [getAllPostsAction, setPageAction, setFilterAction, setOrderAction, setTagsIdAction],
    getAllPosts,
  );
  yield takeEvery(setDeleteIdPostAction, deletePost);
  yield takeEvery(createPostAction, createPostSaga);
  yield takeEvery(getOnePostAction, getOnePost);
  yield takeEvery(setUserPostsAction, getUserPosts);
}
