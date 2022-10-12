import { AxiosPromise } from 'axios';
import { STAT_API_ROUTE } from 'constants/apiRoutes';
import axios from '../../axiosDefault';

// @ts-ignore
// eslint-disable-next-line no-undef
export async function getStatisticRequest(): AxiosPromise<UserStatistic[]> {
  return axios.get(STAT_API_ROUTE.MAIN_ROUTE);
}
