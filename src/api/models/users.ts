import { UserState } from 'store/user/user.reducer';

export interface TokenData {
  accessToken: string;
}

export interface UserCredentialData extends UserState {
  tokenData: TokenData;
}
