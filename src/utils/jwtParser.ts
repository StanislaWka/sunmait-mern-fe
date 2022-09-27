// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export function parseJwt<T extends object = { [k: string]: string | number }>(
  token: string,
): T | undefined {
  try {
    return jwt_decode(token);
  } catch (e) {
    return undefined;
  }
}
