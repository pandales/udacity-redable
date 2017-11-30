import * as api from '../utils/api';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS';

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function receiveCategoryPosts(categoryName, posts) {
  return {
    type: RECEIVE_CATEGORY_POSTS,
    categoryName,
    posts
  }
}


export const getCategories =  dispatch => (
  api.getAllCategories().then(categories => dispatch(receiveCategories(categories)))
);

export const getCategoryPosts =  (dispatch, categoryName) => (
  api.getCategoryPost(categoryName).then(categories => dispatch(receiveCategoryPosts(categoryName, categories)))
);