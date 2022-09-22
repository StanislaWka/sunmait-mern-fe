import { POST_TYPES } from './typesOfActions';

export function getAllPosts() {
  return { type: POST_TYPES.GET_ALL, payload: {} };
}

export function getOnePost(id: string) {
  return { type: POST_TYPES.GET_ONE, payload: { currentPost: { _id: id } } };
}

export function deletePost(id: string) {
  return { type: POST_TYPES.DELETE, payload: { deleteId: id } };
}

export function createPost(title: string, text: string) {
  return { type: POST_TYPES.CREATE, payload: { currentPost: { title, text } } };
}
