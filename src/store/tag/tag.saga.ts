import { createNewTagRequest, deleteTagRequest, getAllTagsRequest } from 'api/agents';
import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { deleteTagFromPostsAction } from 'store/post/post.actions';
import { ActionType } from 'typesafe-actions';
import { snackActions } from 'utils';
import {
  addNewTagAction,
  getAllTagsAction,
  setAllTagsAction,
  setDeleteIdTagAction,
  setNewTagNameAction,
} from './tag.actions';
import { TagData } from './tag.reducer';

function* getAllTags() {
  try {
    const tags: { data: TagData[] } = yield call(getAllTagsRequest);

    yield put(setAllTagsAction(tags.data));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* createNewTag({ payload }: ActionType<typeof setNewTagNameAction>) {
  try {
    const newTag: { data: TagData } = yield call(() => createNewTagRequest(payload));

    yield put(addNewTagAction(newTag.data));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* deleteTag({ payload }: ActionType<typeof setDeleteIdTagAction>) {
  try {
    yield call(() => deleteTagRequest(payload));
    yield put(deleteTagFromPostsAction(payload));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

export default function* tagSaga() {
  yield takeEvery(getAllTagsAction, getAllTags);
  yield takeEvery(setNewTagNameAction, createNewTag);
  yield takeEvery(setDeleteIdTagAction, deleteTag);
}
