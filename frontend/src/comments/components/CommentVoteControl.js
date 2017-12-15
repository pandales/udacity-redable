import React, {Component} from 'react';
import {voteComment} from '../actions';
import {connect} from 'react-redux';
import {FaThumbsODown, FaThumbsOUp} from 'react-icons/lib/fa';

class CommentVoteControl extends Component {

  voteComment(action) {
    const {voteComment, comment} = this.props;
    voteComment(comment, action);
  }

  render() {
    const {comment} = this.props;

    return (
      <div className="votes d-inline">
        <span className=""> votes: {comment.voteScore}</span>
        <FaThumbsODown className="decrease-votes"
                       onClick={this.voteComment.bind(this, 'downVote')}/>
        <FaThumbsOUp className="increase-votes"
                     onClick={this.voteComment.bind(this, 'upVote')}/>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  voteComment: (comment, action) => voteComment(dispatch, comment, action)
});

export default connect(null, mapDispatchToProps)(CommentVoteControl);
