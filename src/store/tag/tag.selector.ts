import { RootState } from 'index';
import { createSelector } from 'reselect';

const tagReducerState = (state: RootState) => state.tagReducer;

export const selectTags = createSelector(tagReducerState, (tagReducer) => tagReducer.tags);
