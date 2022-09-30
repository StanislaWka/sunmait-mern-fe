import { Location, Navigate, useLocation } from 'react-router-dom';

import { APP_ROUTES } from 'constants/';
import { getUserId, timeChecker } from 'utils';
import { useSelector } from 'react-redux';
import { selectUserIsAuth } from 'store/user/user.selectors';
import { useAppDispatch } from 'hooks';
import { setUserIdAction } from 'store/user/user.actions';

export type NavigateState = {
  from: Location;
};

export function PrivateRoute({ to }: { to: JSX.Element }) {
  const isAuth = useSelector(selectUserIsAuth);
  const token = localStorage.getItem('accessToken');
  const haveTime = timeChecker(token || '');
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (!isAuth && haveTime) {
    const userData = getUserId();
    dispatch(setUserIdAction(userData!._id));
  }

  if (!isAuth && !haveTime) {
    return <Navigate to={APP_ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return to;
}
