import React from 'react';
import {voteComment} from '../actions';
import {connect} from 'react-redux';
import {FaThumbsODown, FaThumbsOUp} from 'react-icons/lib/fa';

function CommentVoteControl({voteComment, comment, post}) {

  const vote = (action) => {
    voteComment(comment, action);
  };

  return (
    <div className="votes text-right  d-inline">
      <span className=""> votes: {comment.voteScore}</span>
      <FaThumbsODown className="decrease-votes vote-icon"
                     onClick={() => vote('downVote')}/>
      <FaThumbsOUp className="increase-votes vote-icon"
                   onClick={() => vote('upVote')}/>
    </div>
  )

}

const mapDispatchToProps = (dispatch) => ({
  voteComment: (comment, action) => voteComment(dispatch, comment, action)
});

export default connect(null, mapDispatchToProps)(CommentVoteControl);