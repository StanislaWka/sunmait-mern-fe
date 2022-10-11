import { UserReducer } from 'store/user/user.reducer';
import { parseJwt } from './jwtParser';

export const getUserId = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const userData: Pick<UserReducer, '_id' | 'email' | 'name' | 'surname' | 'roleId'> | undefined =
      parseJwt(token);
    // eslint-disable-next-line no-underscore-dangle
    return userData;
  }
  return null;
};
