import { UserCredentialData } from 'api/models/users';
import { AxiosPromise } from 'axios';
import { USERS_API_ROUTES } from 'constants/apiRoutes';
import axios from '../../axiosDefault';

export async function requestLoginUser(state: {
  email: string;
  password: string;
  // @ts-ignore
}): AxiosPromise<{ data: UserCredentialData }> {
  const result = axios({
    method: 'post',
    url: USERS_API_ROUTES.LOGIN,
    data: state,
  });
  return result;
}

export async function requestRegisterUser(state: {
  email: string;
  password: string;
  name: string;
  surname: string;
  // @ts-ignore
}): AxiosPromise<{ data: UserCredentialData }> {
  const result = axios({
    method: 'post',
    url: USERS_API_ROUTES.REGISTRATION,
    data: state,
  });
  return result;
}
