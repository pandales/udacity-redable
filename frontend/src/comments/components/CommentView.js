import React, {Component} from 'react';
import Moment from 'react-moment';
import {deleteComment, editComment} from '../actions';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import CommentVoteControl from './CommentVoteControl';
import EditCommentForm from './EditCommentForm';
import {FaClose} from 'react-icons/lib/fa';
import avatar from '../../images/avatar.png'

class CommentView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false
    }
  }

  deleteComment(comment) {
    console.log("delete comment");
    this.props.deleteComment(comment)
  }

  editComment = comment => {
    this.props.editComment(comment);
    this.closeModal();
  };

  openModal() {
    this.setState({
      isBeingEdited: true
    });
  }

  closeModal() {
    this.setState({
      isBeingEdited: false
    });
  }

  render() {
    const {comment} = this.props;
    const commentDate = new Date(comment.timestamp);

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <div className="comment-menu text-right">
              <a className="card-link" href="#" onClick={this.openModal.bind(this, comment)}>Edit</a>
              <a className="card-link" href="#" onClick={this.deleteComment.bind(this, comment)}>Delete</a>
              <span className="card-link"><CommentVoteControl comment={comment}/></span>
            </div>
            <div className="row">
              <div className="col-md-2 col-sm-3 text-center">
                <img className="card-img-top"
                     src={avatar}
                     data-holder-rendered="true"/>
                <p className="card-text">
                  {comment.author} <br/>
                  <small className="text-muted"><Moment format="MM/DD/YY">{commentDate}</Moment></small>
                </p>

              </div>
              <div className="col-md-10 col-sm-9">
                <p className="card-text">{comment.body}</p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.isBeingEdited}
          style={styles.modal}
          contentLabel="Edit Comment"
          appElement={document.getElementById('root')}
        >
          <a onClick={this.closeModal.bind(this)} className={'float-right'}> <FaClose size={30}/></a>
          <EditCommentForm
            comment={comment}
            closeModal={this.closeModal.bind(this)}
            editComment={this.editComment.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}

const styles = {
  modal: {
    content:{
      bottom: 'auto',
      width: '600px',
      left: '50%',
      right: '40px',
      marginLeft: '-300px'
    }
  }
};

const mapStateToProps = (state, props) => ({
  comments: state.comments,
});

const mapDispatchToProps = (dispatch) => ({
  deleteComment: id => deleteComment(dispatch, id),
  editComment: comment => editComment(dispatch, comment)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);