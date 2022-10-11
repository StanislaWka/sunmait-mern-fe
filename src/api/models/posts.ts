import { PostState } from 'store/post/post.reducer';

export interface PostPatchData extends Omit<PostState, 'user'> {}

export interface MessageResponse {
  message: string;
}
