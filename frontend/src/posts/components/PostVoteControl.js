import React, {Component} from 'react';
import {votePost} from '../actions';
import {connect} from 'react-redux';
import {FaThumbsOUp, FaPlusSquareO, FaMinusSquareO} from 'react-icons/lib/fa';

function PostVoteControl(props) {

  const votePost = (action) => {
    const {votePost, post} = props;
    votePost(post, action);
  };

  const {post: {voteScore}} = props;

  return (
    <div className="votes text-right" style={styles.container}>
      <div className="controls" style={styles.controls}>
        <FaPlusSquareO className="increase-votes vote-icon"
                       style={styles.controlsIcons}
                       onClick={() => votePost('upVote')} title={'Click to add 1 vote'}/>
        <FaMinusSquareO className="decrease-votes vote-icon"
                        style={styles.controlsIcons}
                        onClick={() => votePost('downVote')} title={'Click to add -1 vote'}/>
      </div>
      <div className="info">
        <FaThumbsOUp style={{fontSize: 25}} title={'votes'}/>
        <span className="">{voteScore}</span>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    items: 'center'
  },
  controls: {
    display: 'flex',
    flexDirection: 'column'
  },
  controlsIcons: {
    fontSize: 14
  }
};

const mapDispatchToProps = (dispatch) => ({
  votePost: (post, action) => votePost(dispatch, post, action)
});

export default connect(null, mapDispatchToProps)(PostVoteControl);