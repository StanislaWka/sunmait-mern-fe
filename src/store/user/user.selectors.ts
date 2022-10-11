import type { RootState } from 'index';
import { createSelector } from 'reselect';

const selectUserReducer = (state: RootState) => state.userReducer;

export const selectUserId = createSelector(selectUserReducer, (userReducer) => userReducer._id);

export const selectUserIsAuth = createSelector(
  selectUserReducer,
  (userReducer) => userReducer.isAuth,
);
