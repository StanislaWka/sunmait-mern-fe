import { Location, Navigate, useLocation } from 'react-router-dom';

import { APP_ROUTES } from 'constants/';
import { useAppSelector } from 'hooks';
import { timeChecker } from 'utils';

export type NavigateState = {
  from: Location;
};

export function PrivateRoute({ to }: { to: JSX.Element }) {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const token = localStorage.getItem('accessToken');
  const haveTime = timeChecker(token || '');
  const location = useLocation();

  if (!isAuth && !haveTime) {
    return <Navigate to={APP_ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return to;
}
