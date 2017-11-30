import {
  RECEIVE_POSTS
} from './actions';

const initialState = {
  items: [],
  category: null
};

function posts (state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case RECEIVE_POSTS :
      console.log('Get Posts');
      const { category, items } = action;
      newState = Object.assign({}, state);
      newState.items = items;
      newState.category = category ? category : null;

      return newState;

    default :
      return state
  }
}

export default posts;