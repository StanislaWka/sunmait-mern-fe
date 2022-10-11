import { PrivateRoute } from 'components/privateRoute';
import { APP_ROUTES } from 'constants/appRoutes';
import { MainPage, SignInPage, SignUpPage, StatisticPage } from 'pages';
import { MyPosts } from 'pages/myPosts';
import { Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME_PAGE} element={<PrivateRoute to={<MainPage />} />} />
      <Route path={APP_ROUTES.SIGN_IN} element={<SignInPage />} />
      <Route path={APP_ROUTES.SIGN_UP} element={<SignUpPage />} />
      <Route
        path={APP_ROUTES.STATISTIC}
        element={<PrivateRoute roleName="admin" to={<StatisticPage />} />}
      />
      <Route path={APP_ROUTES.MY_POSTS} element={<PrivateRoute to={<MyPosts />} />} />
      <Route path="*" element={<PrivateRoute to={<MainPage />} />} />
    </Routes>
  );
}
