import {
  RECEIVED_POSTS,
  RECEIVED_POST,
  POST_ADDED,
  POST_DELETED,
  POST_UPDATED
} from './actions';

const initialState = {
  items: [],
  category: null
};

function posts(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case RECEIVED_POSTS :
      console.log('Get Posts');
      const {category, items} = action;
      newState = Object.assign({}, state);
      newState.items = items;
      newState.category = category ? category : null;

      return newState;

    case RECEIVED_POST :
      console.log('Get Post');
      const {receivedPost} = action;

      // Update the reducer


      return newState;

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
      return newState;

    case POST_UPDATED:
      console.log('Post Updated');
      const { updatedPost } = action;
      newState = Object.assign({}, state,{
        items: state.items.map((item) => {
          if(item.id !== updatedPost.id){
            return item;
          } else {
            return updatedPost;
          }
        })
      });
      return newState;

    default :
      return state
  }
}

export default posts;