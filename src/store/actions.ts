import { ActionType } from 'typesafe-actions';
import * as postActions from './post/post.actions';
import * as userActions from './user/user.actions';

export type RootActions = ActionType<typeof postActions | typeof userActions>;
