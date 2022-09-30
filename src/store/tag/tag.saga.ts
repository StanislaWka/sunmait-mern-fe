import { createNewTagRequest, deleteTagRequest, getAllTagsRequest } from 'api/agents';
import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { selectState } from 'store/selector';
import { snackActions } from 'utils';
import { addNewTagAction, setAllTagsAction } from './tag.actions';
import { TagData } from './tag.reducer';
import TAG_TYPES from './tag.types';

function* getAllTags() {
  try {
    const tags: { data: TagData[] } = yield call(getAllTagsRequest);

    yield put(setAllTagsAction(tags.data));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* createNewTag() {
  try {
    const newTagName: string = yield selectState((s) => s.tagReducer.newTagName);

    const newTag: { data: TagData } = yield call(() => createNewTagRequest(newTagName));

    yield put(addNewTagAction(newTag.data));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

function* deleteTag() {
  try {
    const deleteTagId: string = yield selectState((s) => s.tagReducer.deleteId);

    yield call(() => deleteTagRequest(deleteTagId));
  } catch (e) {
    console.error(e);
    snackActions.error((e as AxiosError).message);
  }
}

export default function* tagSaga() {
  yield takeEvery(TAG_TYPES.GET_ALL, getAllTags);
  yield takeEvery(TAG_TYPES.SET_NEW_TAG_NAME, createNewTag);
  yield takeEvery(TAG_TYPES.SET_DELETE_ID, deleteTag);
}
