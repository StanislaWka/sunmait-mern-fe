import { RootState } from 'index';
import { createSelector } from 'reselect';

export const selectStatisticReducer = (state: RootState) => state.statisticReducer;

export const selectUserStatistic = createSelector(
  selectStatisticReducer,
  (statisticReducer) => statisticReducer,
);
