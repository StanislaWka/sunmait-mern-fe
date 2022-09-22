import {
  createPostRequest,
  deletePostRequest,
  getAllPostsRequest,
  getOnePostRequest,
} from 'api/agents/postService';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PostState } from 'store/reducers/postReducer';
import { POST_TYPES } from 'store/reducers/postReducer/typesOfActions';

import { selectState } from '../selector';

function* getAllPosts() {
  try {
    // const state: PostState = yield selectState((s) => s.postReducer);
    const posts: { data: PostState[] } = yield call(getAllPostsRequest);
    yield put({
      type: POST_TYPES.SET_ALL,
      payload: { posts: posts.data },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function* getOnePost() {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const postId: string = yield selectState((s) => s.postReducer.currentPost._id);

    const currentPost: { data: PostState } = yield call(() => getOnePostRequest(postId));

    yield put({
      type: POST_TYPES.SET_ONE,
      payload: { currentPost: currentPost.data },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function* deletePost() {
  try {
    const postId: string = yield selectState((s) => s.postReducer.deleteId);

    yield call(() => deletePostRequest(postId));

    const posts: { data: PostState[] } = yield call(getAllPostsRequest);

    yield put({
      type: POST_TYPES.SET_ALL,
      payload: { posts: posts.data },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function* createPost() {
  try {
    const data: { title: string; text: string } = yield selectState(
      (s) => s.postReducer.currentPost,
    );

    // eslint-disable-next-line no-underscore-dangle
    const userId: string = yield selectState((s) => s.userReducer._id);
    yield call(() => createPostRequest({ ...data, userId }));

    const posts: { data: PostState[] } = yield call(getAllPostsRequest);

    yield put({
      type: POST_TYPES.SET_ALL,
      payload: { posts: posts.data },
    });
    yield put({
      type: POST_TYPES.CLEAR_CURRENT,
      payload: { currentPost: {} },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default function* postSaga() {
  yield takeEvery(POST_TYPES.GET_ALL, getAllPosts);
  yield takeEvery(POST_TYPES.DELETE, deletePost);
  yield takeEvery(POST_TYPES.CREATE, createPost);
  yield takeEvery(POST_TYPES.GET_ONE, getOnePost);
}
