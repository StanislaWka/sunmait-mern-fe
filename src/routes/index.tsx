import { PrivateRoute } from 'components/privateRoute';
import { APP_ROUTES } from 'constants/appRoutes';
import { MainPage, SignInPage, SignUpPage } from 'pages';
import { Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME_PAGE} element={<PrivateRoute to={<MainPage />} />} />
      <Route path={APP_ROUTES.SIGN_IN} element={<SignInPage />} />
      <Route path={APP_ROUTES.SIGN_UP} element={<SignUpPage />} />
    </Routes>
  );
}
