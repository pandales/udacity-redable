import * as util from '../utils/util';
import * as api from '../utils/api';

export const COMMENTS_RECEIVED = 'COMMENTS_RECEIVED';
export const COMMENT_ADDED = 'COMMENT_ADDED';
export const COMMENT_DELETED = 'COMMENT_DELETED';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';

export function commentsReceived(parentID, items) {
  return {
    type: COMMENTS_RECEIVED,
    parentID,
    items
  }
}

export function commentAdded(comment){
  return {
    type: COMMENT_ADDED,
    comment
  }
}
export function commentDeleted(deletedComment){
  return {
    type: COMMENT_DELETED,
    deletedComment
  }
}

export function commentUpdated(updatedComment){
  return {
    type: COMMENT_UPDATED,
    updatedComment
  }
}

export const getComments =  (dispatch, parentID) => (
  api.getComments(parentID).then(comments => dispatch(commentsReceived(parentID, comments)))
);

export const addComment = (dispatch, comment) => {
  const populatedComment = {
    ...comment,
    id: util.createGuid(),
    timestamp: Date.now()
    //voteScore:0,
  };
  api.addComment(populatedComment).then(result => dispatch(commentAdded(result)));
};

export const editComment = (dispatch, comment) => {

  api.editComment(comment).then(result => dispatch(commentUpdated(result)));
};


export const deleteComment = (dispatch, comment) => {
  api.deleteComment(comment.id).then(result => dispatch(commentDeleted(comment)));
};