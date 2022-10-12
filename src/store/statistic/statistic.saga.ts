import { getStatisticRequest } from 'api/agents';
import { UserStatistic } from 'api/models/statistic';
import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { snackActions } from 'utils';
import { getStatisticAction, setStatisticAction } from './statistic.actions';

function* getStatistic() {
  try {
    const stats: { data: UserStatistic[] } = yield call(getStatisticRequest);
    yield put(setStatisticAction(stats.data));
  } catch (err) {
    console.error(err);
    snackActions.error((err as AxiosError).message);
  }
}

export default function* statisticSaga() {
  yield takeEvery(getStatisticAction, getStatistic);
}
