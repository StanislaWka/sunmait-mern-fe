const API = process.env.REACT_APP_API_URL;

export const API_V1_ROUTE = `${API}/api/v1`;

export const USERS_ROUTE = '/users';

export const USERS_API_ROUTES = {
  GET_USERS: USERS_ROUTE,
  LOGIN: `${USERS_ROUTE}/login`,
  REGISTRATION: `${USERS_ROUTE}/registration`,
};

export const POSTS_ROUTE = '/posts';

export const POSTS_API_ROUTES = {
  MAIN_ROUTE: `${POSTS_ROUTE}/`,
  MAIN_ROUTE_ID: (id: string) => `${POSTS_ROUTE}/${id}`,
};
