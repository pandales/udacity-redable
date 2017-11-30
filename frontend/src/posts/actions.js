import * as api from '../utils/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';



export function receivePosts(items, categoryName = null) {
  return {
    type: RECEIVE_POSTS,
    categoryName,
    items
  }
}

export const getPosts =  dispatch => (
  api.getPosts().then(posts => dispatch(receivePosts(posts)))
);