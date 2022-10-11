import { UserStatistic } from 'api/models/statistic';
import { createReducer } from 'typesafe-actions';
import { RootActions } from '../actions';
import { setStatisticAction } from './statistic.actions';

const initialState: UserStatistic[] = [];

export const statisticReducer = createReducer<UserStatistic[], RootActions>(
  initialState,
).handleAction(setStatisticAction, (state, { payload }) => [...payload]);
