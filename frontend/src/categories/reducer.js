import {
  RECEIVE_CATEGORIES,
  RECEIVE_CATEGORY_POSTS
} from './actions';

const initialState = {
  items: [],
  posts: {

  }
};

function categories (state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      console.log('Get all the categories');
      const { categories } = action;
      newState = Object.assign({}, state);
      newState.items = categories;

      return newState;

    case RECEIVE_CATEGORY_POSTS :
      const { categoryName, posts } = action;
      console.log(`Get all posts from ${categoryName} categories`);
      newState = Object.assign({}, state);
      newState.posts[categoryName] = posts;

      return newState;
    default :
      return state
  }
}

export default categories;