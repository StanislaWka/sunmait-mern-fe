import { UserReducer } from 'store/user/user.reducer';

export interface TokenData {
  accessToken: string;
}

export interface UserCredentialData extends UserReducer {
  tokenData: TokenData;
}
