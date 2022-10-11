import { ActionType } from 'typesafe-actions';
import * as postActions from './post/post.actions';
import * as userActions from './user/user.actions';
import * as tagsActions from './tag/tag.actions';
import * as statisticActions from './statistic/statistic.actions';

export type RootActions = ActionType<
  typeof postActions | typeof userActions | typeof tagsActions | typeof statisticActions
>;
