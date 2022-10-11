import { createAction } from 'typesafe-actions';
import { TagData } from './tag.reducer';
import TAG_TYPES from './tag.types';

export const getAllTagsAction = createAction(TAG_TYPES.GET_ALL)();
export const setNewTagNameAction = createAction(
  TAG_TYPES.SET_NEW_TAG_NAME,
  (tagName: string) => tagName,
)();

export const addNewTagAction = createAction(TAG_TYPES.ADD_NEW_TAG, (tag: TagData) => tag)();

export const setAllTagsAction = createAction(TAG_TYPES.SET_ALL, (tags: TagData[]) => tags)();

export const setDeleteIdTagAction = createAction(TAG_TYPES.SET_DELETE_ID, (id: string) => id)();
