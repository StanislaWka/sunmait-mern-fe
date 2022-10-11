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
}

const initialState: TagReducer = {
  tags: [],
};

export const tagReducer = createReducer<TagReducer, RootActions>(initialState)
  .handleAction(ACTIONS.setAllTagsAction, (state, { payload }) => ({ ...state, tags: payload }))
  .handleAction(ACTIONS.addNewTagAction, (state, { payload }) => ({
    ...state,
    tags: [...state.tags, payload],
  }))
  .handleAction(ACTIONS.setDeleteIdTagAction, (state, { payload }) => ({
    ...state,
    tags: state.tags.filter((tag) => tag._id !== payload),
    deleteId: payload,
  }));
