import type { RootState } from 'index';
import { createSelector } from 'reselect';

const selectUserReducer = (state: RootState) => state.userReducer;
const selectRole = (state: RootState) => state.userReducer.roleId;

export const selectUserId = createSelector(selectUserReducer, (userReducer) => userReducer._id);

export const selectUserIsAuth = createSelector(
  selectUserReducer,
  (userReducer) => userReducer.isAuth,
);

export const selectUserRoleName = createSelector(selectRole, (role) => role.name);
