import { UserState } from 'store/reducers/userReducer';

export interface TokenData {
  accessToken: string;
}

export interface UserCredentialData extends UserState {
  tokenData: TokenData;
}
