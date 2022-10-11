import { Location, Navigate, useLocation } from 'react-router-dom';

import { APP_ROUTES } from 'constants/';
import { getUserId, timeChecker } from 'utils';
import { useSelector } from 'react-redux';
import { selectUserIsAuth, selectUserRoleName } from 'store/user/user.selectors';
import { useAppDispatch } from 'hooks';
import { setUserIdAndRoleAction } from 'store/user/user.actions';

export type NavigateState = {
  from: Location;
};

export function PrivateRoute({ to, roleName }: { to: JSX.Element; roleName?: string }) {
  const isAuth = useSelector(selectUserIsAuth);
  const token = localStorage.getItem('accessToken');
  const haveTime = timeChecker(token || '');
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (!isAuth && haveTime) {
    const userData = getUserId();
    if (userData?._id && userData?.roleId) {
      dispatch(setUserIdAndRoleAction(userData!._id, userData.roleId));
      const userRole = useSelector(selectUserRoleName);
      if (roleName === userRole) {
        return to;
      }
    } else {
      return <Navigate to={APP_ROUTES.SIGN_IN} state={{ from: location }} replace />;
    }
  }

  if (!isAuth && !haveTime) {
    return <Navigate to={APP_ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return to;
}
