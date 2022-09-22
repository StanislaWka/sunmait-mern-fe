import { PostState } from 'store/reducers/postReducer';

export interface PostPatchData extends Omit<PostState, 'user'> {}

export interface MessageResponse {
  message: string;
}
