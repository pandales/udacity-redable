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
      <div className="votes container-fluid">
        <div className="row">
          <div className="col-6"> votes: {post.voteScore}</div>
          <div className="col">
            <FaThumbsODown className="decrease-votes"
                           onClick={this.votePost.bind(this, 'downVote')}/>
          </div>
          <div className="col">
            <FaThumbsOUp className="increase-votes"
                         onClick={this.votePost.bind(this, 'upVote')}/>
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  votePost: (post, action) => votePost(dispatch, post, action)
});

export default connect(null, mapDispatchToProps)(PostVoteControl);