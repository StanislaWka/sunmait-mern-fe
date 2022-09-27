/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostPatchData, MessageResponse } from 'api/models/posts';
import { UserCredentialData } from 'api/models/users';
import { AxiosPromise } from 'axios';
import { POSTS_API_ROUTES } from 'constants/apiRoutes';
import { PostState } from 'store/post/post.reducer';
import axios from '../../axiosDefault';

// @ts-ignore
export async function getAllPostsRequest(): AxiosPromise<PostState[]> {
  return axios.get(POSTS_API_ROUTES.MAIN_ROUTE);
}

export async function getOnePostRequest(id: string) {
  return axios.get(POSTS_API_ROUTES.MAIN_ROUTE_ID(id));
}

export async function patchPostRequest(data: PostPatchData) {
  const { _id, ...otherData } = data;
  return axios.patch(POSTS_API_ROUTES.MAIN_ROUTE_ID(_id), otherData);
}

// @ts-ignore
export async function deletePostRequest(id: string): AxiosPromise<MessageResponse> {
  return axios.delete(POSTS_API_ROUTES.MAIN_ROUTE_ID(id));
}

export async function createPostRequest(data: {
  title: string;
  text: string;
  userId: string;
  // @ts-ignore
}): AxiosPromise<MessageResponse> {
  return axios.post(POSTS_API_ROUTES.MAIN_ROUTE, data);
}
