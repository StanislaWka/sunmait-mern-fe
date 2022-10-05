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

function* getAllPosts({ payload }: ActionType<typeof getAllPostsAction>) {
  // eslint-disable-next-line prefer-const
  let { limit = 5, page } = payload;
  try {
    if (!page) {
      page = yield selectState((s) => s.postReducer.page);
    }
    const filter: string = yield selectState((s) => s.postReducer.filter);
    const order: string = yield selectState((s) => s.postReducer.order);
    const tagsId: string[] = yield selectState((s) => s.postReducer.tagsId);
    const posts: { data: any } = yield call(() =>
      getAllPostsRequest(limit, page, filter, order, tagsId),
    );
    yield put(setAllAction(posts.data[0].posts));
    if (posts.data[0].posts.length) {
      yield put(setCountAction(posts.data[0].totalCount[0].count));
    }
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
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* getUserPosts({ payload }: ActionType<typeof setUserPostsAction>) {
  const { limit, page } = payload;
  try {
    const posts: { data: any } = yield call(() => getUserPostsRequest(limit, page));
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
