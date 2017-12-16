import React, {Component} from 'react';
import {votePost} from '../actions';
import {connect} from 'react-redux';
import {FaThumbsODown, FaThumbsOUp} from 'react-icons/lib/fa';

class PostVoteControl extends Component {

  votePost(action) {
    const {votePost, post} = this.props;
    votePost(post, action);
  }

  render() {
    const {post} = this.props;
    return (
      <div className="votes text-right">
          <span className=""> votes: {post.voteScore}</span>
          <FaThumbsODown className="decrease-votes vote-icon"
                         onClick={this.votePost.bind(this, 'downVote')} title={'Click to add -1 vote'}  />
          <FaThumbsOUp className="increase-votes vote-icon"
                         onClick={this.votePost.bind(this, 'upVote')} title={'Click to add 1 vote'} />
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  votePost: (post, action) => votePost(dispatch, post, action)
});

export default connect(null, mapDispatchToProps)(PostVoteControl);