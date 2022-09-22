import axios from 'axios';
import { API_V1_ROUTE } from 'constants/apiRoutes';

const instance = axios.create({
  baseURL: API_V1_ROUTE,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` && '' },
});

instance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line dot-notation
    config.headers!['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
