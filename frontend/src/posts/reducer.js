import {
  RECEIVED_POSTS,
  RECEIVED_POST,
  POST_ADDED,
  POST_DELETED,
  POST_UPDATED,
  RESET_CURRENT_POST
} from './actions';

const initialState = {
  items: [],
  category: null,
  currentPost: null
};

function posts(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case RECEIVED_POSTS :
      console.log('Get Posts');
      const {items} = action;
      newState = Object.assign({}, state);
      newState.items = items;

      return newState;

    case RECEIVED_POST :
      console.log('Get Post');
      const {receivedPost} = action;

      return {
        ...state,
        currentPost: receivedPost
      };

    case POST_ADDED:
      console.log('Added Post');
      const {post} = action;
      newState = Object.assign({}, state);
      newState.items.push(post);

      return newState;

    case POST_DELETED:
      console.log('Post Deleted');
      const { deletedPost } = action;
      newState = Object.assign({}, state,{
        items: state.items.filter((item) => item.id !== deletedPost.id)
      });
      return {
        ...newState,
        currentPost: null
      };

    case POST_UPDATED:
      console.log('Updated Post');
      const { updatedPost, isCurrent } = action;

      newState = Object.assign({}, state,{
        items: state.items.map((item) => {
          if(item.id !== updatedPost.id){
            return item;
          } else {
            return updatedPost;
          }
        })
      });

      if(isCurrent) newState.currentPost = updatedPost;

      return newState;

    case RESET_CURRENT_POST:
      console.log("current post reseted");

      return {
        ...state,
        currentPost: null
      };


    default :
      return state
  }
}

export default posts;