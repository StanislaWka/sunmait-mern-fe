import { all, spawn } from '@redux-saga/core/effects';
import postSaga from './post/post.saga';
import statisticSaga from './statistic/statistic.saga';
import tagSaga from './tag/tag.saga';
import userSaga from './user/user.saga';

export function* rootSaga() {
  const sagas = [userSaga, postSaga, tagSaga, statisticSaga];

  yield all(sagas.map((s) => spawn(s)));
}
