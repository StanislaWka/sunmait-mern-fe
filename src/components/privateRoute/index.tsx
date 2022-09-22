import { Location, Navigate, useLocation } from 'react-router-dom';

import { APP_ROUTES } from 'constants/';
import { useAppSelector } from 'hooks';

export type NavigateState = {
  from: Location;
};

export function PrivateRoute({ to }: { to: JSX.Element }) {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={APP_ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return to;
}
