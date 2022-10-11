import { AxiosPromise } from 'axios';
import { TAG_API_ROUTES } from 'constants/apiRoutes';
import { TagData } from 'store/tag/tag.reducer';
import axios from '../../axiosDefault';

// @ts-ignore
export async function getAllTagsRequest(): AxiosPromise<TagData[]> {
  return axios.get(TAG_API_ROUTES.MAIN_ROUTE);
}

// @ts-ignore
export async function createNewTagRequest(name: string): AxiosPromise<TagData> {
  return axios.post(TAG_API_ROUTES.MAIN_ROUTE, { name });
}

// @ts-ignore
export async function deleteTagRequest(id: string): AxiosPromise<void> {
  return axios.delete(TAG_API_ROUTES.MAIN_ROUTE_ID(id));
}
