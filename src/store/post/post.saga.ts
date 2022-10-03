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
import POST_TYPES from 'store/post/post.types';
import { snackActions } from 'utils';

import { selectState } from '../selector';
import {
  clearCurrentPostACtion,
  setAllAction,
  setCountAction,
  setCurrentPostAction,
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

function* getOnePost() {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const postId: string = yield selectState((s) => s.postReducer.currentPost._id);

    const currentPost: { data: CurrentPostData } = yield call(() => getOnePostRequest(postId));

    yield put(setCurrentPostAction(currentPost.data));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* deletePost() {
  try {
    const postId: string = yield selectState((s) => s.postReducer.deleteId);

    yield call(() => deletePostRequest(postId));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* createPostSaga() {
  try {
    const data: { title: string; text: string } = yield selectState(
      (s) => s.postReducer.currentPost,
    );

    // eslint-disable-next-line no-underscore-dangle
    const userId: string = yield selectState((s) => s.userReducer._id);
    yield call(() => createPostRequest({ ...data, userId }));

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

// function* getFilteredPosts() {
//   try {
//     const limit: number = yield selectState((s) => s.postReducer.limit);
//     const page: number = yield selectState((s) => s.postReducer.page);
//     const filter: string = yield selectState((s) => s.postReducer.filter);
//     const posts: { data: any } = yield call(() => getAllPostsRequest(limit, page, filter));
//     yield put(setAllAction(posts.data[0].posts));
//     yield put(setCountAction(posts.data[0].totalCount[0].count));
//   } catch (e) {
//     console.error(e);
//     snackActions.error((e as AxiosError).message);
//   }
// }

// function* getPostsByOrder() {
//   try {
//     const limit: number = yield selectState((s) => s.postReducer.limit);
//     const page: number = yield selectState((s) => s.postReducer.page);
//     const order: string = yield selectState((s) => s.postReducer.order);
//     const posts: { data: any } = yield call(() => getAllPostsRequest(limit, page, '', order));
//     yield put(setAllAction(posts.data[0].posts));
//     yield put(setCountAction(posts.data[0].totalCount[0].count));
//   } catch (e) {
//     console.error(e);
//     snackActions.error((e as AxiosError).message);
//   }
// }

// function* getPostsWithTags() {
//   try {
//     const limit: number = yield selectState((s) => s.postReducer.limit);
//     const page: number = yield selectState((s) => s.postReducer.page);
//     const filter: string = yield selectState((s) => s.postReducer.filter);
//     const order: string = yield selectState((s) => s.postReducer.order);
//     const tagsId: string[] = yield selectState((s) => s.postReducer.tagsId);
//     const stringTags = tagsId.join(',');
//     const posts: { data: any } = yield call(() =>
//       getAllPostsRequest(limit, page, filter, order, stringTags),
//     );
//     yield put(setAllAction(posts.data[0].posts));
//     yield put(setCountAction(posts.data[0].totalCount[0].count));
//   } catch (e) {
//     console.error(e);
//     snackActions.error((e as AxiosError).message);
//   }
// }

export default function* postSaga() {
  yield takeEvery(POST_TYPES.GET_ALL, getAllPosts);
  yield takeEvery(POST_TYPES.DELETE, deletePost);
  yield takeEvery(POST_TYPES.CREATE, createPostSaga);
  yield takeEvery(POST_TYPES.GET_ONE, getOnePost);
  yield takeEvery(POST_TYPES.SET_PAGE, getAllPosts);
  yield takeEvery(POST_TYPES.SET_USER_POSTS, getUserPosts);
  yield takeEvery(POST_TYPES.SET_FILTER, getAllPosts);
  yield takeEvery(POST_TYPES.SET_ORDER, getAllPosts);
  yield takeEvery(POST_TYPES.SET_TAGS_ID, getAllPosts);
}
