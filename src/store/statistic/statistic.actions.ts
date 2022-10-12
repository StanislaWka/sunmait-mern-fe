import { UserStatistic } from 'api/models/statistic';
import { createAction } from 'typesafe-actions';
import { STATISTIC_TYPES } from './statistic.types';

export const getStatisticAction = createAction(STATISTIC_TYPES.GET_STATISTIC)();
export const setStatisticAction = createAction(
  STATISTIC_TYPES.SET_STATISTIC,
  (stat: UserStatistic[]) => stat,
)();
