import { parseJwt } from 'utils';

const SECONDS = 1000;

export const timeChecker = (token: string): boolean => {
  const userData = parseJwt(token);
  if (userData && Date.now() >= (userData!.exp as number) * SECONDS) {
    return false;
  }
  return true;
};
