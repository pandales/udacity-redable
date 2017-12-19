import * as util from '../utils/util';
import * as api from '../utils/api';

export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const RECEIVED_POST = 'RECEIVED_POST';
export const POST_ADDED = 'POST_ADDED';
export const POST_DELETED = 'POST_DELETED';
export const POST_UPDATED = 'POST_UPDATED';
export const RESET_CURRENT_POST = 'RESET_CURRENT_POST';

export function postsReceived(items, categoryName = null) {
  return {
    type: RECEIVED_POSTS,
    categoryName,
    items
  }
}

export function postReceived(receivedPost) {
  return {
    type: RECEIVED_POST,
    receivedPost
  }
}

export function postAdded(post){
  return {
    type: POST_ADDED,
    post
  }
}
export function postDeleted(deletedPost){
  return {
    type: POST_DELETED,
    deletedPost
  }
}

export function postUpdated(updatedPost, isCurrent = true){
  return {
    type: POST_UPDATED,
    updatedPost,
    isCurrent
  }
}

export function resetCurrentPost(){
  return {
    type: RESET_CURRENT_POST
  }
}

export const getPosts =  dispatch => (
  api.getPosts().then(posts => dispatch(postsReceived(posts)))
);

export const getPost =  (dispatch, postID) => (
  api.getPost(postID).then(post => dispatch(postReceived(post)))
);

export const addPost = (dispatch, post) => {
  const populatedPost = {
    ...post,
    id: util.createGuid(),
    timestamp: Date.now(),
    voteScore:0,
    deleted:false,
    commentCount:0
  };
  api.addPost(populatedPost).then(result => dispatch(postAdded(result)));
};

export const editPost = (dispatch, post) => {

  api.editPost(post).then(result => dispatch(postUpdated(result)));
};

export const deletePost = (dispatch, postID) => {
  api.deletePost(postID).then(result => dispatch(postDeleted(result)));
};

export const votePost = (dispatch, post, action, isCurrent = true) => {
  api.votePost(post.id, action).then(result => dispatch(postUpdated(result, isCurrent)));
};