import * as util from '../utils/util';
import * as api from '../utils/api';

export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const RECEIVED_POST = 'RECEIVED_POST';
export const POST_ADDED = 'POST_ADDED';
export const POST_DELETED = 'POST_DELETED';
export const POST_UPDATED = 'POST_UPDATED';

export function postsReceived(items, categoryName = null) {
  return {
    type: RECEIVED_POSTS,
    categoryName,
    items
  }
}

export function postReceived(post) {
  return {
    type: RECEIVED_POST,
    post
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

export function postUpdated(updatedPost){
  return {
    type: POST_UPDATED,
    updatedPost
  }
}

export const getPosts =  dispatch => (
  api.getPosts().then(posts => dispatch(postsReceived(posts)))
);

export const getPost =  (dispatch, postID) => (
  api.getPost(postID).then(posts => dispatch(postReceived(posts)))
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

export const votePost = (dispatch, post, action) => {
  api.votePost(post.id, action).then(result => dispatch(postUpdated(result)));
};