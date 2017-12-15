import {
  COMMENTS_RECEIVED,
  COMMENT_ADDED,
  COMMENT_DELETED,
  COMMENT_UPDATED
} from './actions';


const initialState = {};

function comments(state = initialState, action) {
  let newState = [];
  switch (action.type) {
    case COMMENTS_RECEIVED :
      console.log('Get Comments');
      const {items, parentID} = action;

      newState = Object.assign({}, state);
      newState[parentID] = items;

      return newState;

    case COMMENT_ADDED:
      console.log('Comment Added');
      const {comment} = action;
      newState = Object.assign({}, state);
      newState[comment.parentId].push(comment);

      return newState;

    case COMMENT_DELETED:
      console.log('Comment Deleted');
      const { deletedComment } = action;
      newState = Object.assign({}, state, {
        [`${deletedComment.parentId}`]:  state[deletedComment.parentId]
          .filter(item => item.id !== deletedComment.id)
      });

      /*newState[deletedComment.parentId] = newState[deletedComment.parentId]
        .filter(item => item.id !== deletedComment.id);*/

      return newState;

    case COMMENT_UPDATED:
      console.log('Comment Updated');
      const { updatedComment } = action;
      newState = Object.assign({}, state,{
        [`${updatedComment.parentId}`]: state[updatedComment.parentId].map((item) => {
          if(item.id !== updatedComment.id){
            return item;
          } else {
            return updatedComment;
          }
        })
      });
      return newState;

    default :
      return state
  }
}

export default comments;