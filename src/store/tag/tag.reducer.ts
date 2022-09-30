import { createReducer } from 'typesafe-actions';

import { RootActions } from 'store/actions';
import * as ACTIONS from './tag.actions';

export interface TagData {
  _id: string;
  name: string;
  color: string;
}

export interface TagReducer {
  tags: TagData[];
  newTagName: string;
  deleteId?: string;
}

const initialState: TagReducer = {
  tags: [],
  newTagName: '',
};

export const tagReducer = createReducer<TagReducer, RootActions>(initialState)
  .handleAction(ACTIONS.setAllTagsAction, (state, { payload }) => ({ ...state, tags: payload }))
  .handleAction(ACTIONS.setNewTagNameAction, (state, { payload }) => ({
    ...state,
    newTagName: payload,
  }))
  .handleAction(ACTIONS.addNewTagAction, (state, { payload }) => ({
    ...state,
    tags: [...state.tags, payload],
  }))
  .handleAction(ACTIONS.setDeleteIdTagAction, (state, { payload }) => ({
    ...state,
    tags: state.tags.filter((tag) => tag._id !== payload),
    deleteId: payload,
  }));