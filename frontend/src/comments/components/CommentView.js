import React, {Component} from 'react';
import Moment from 'react-moment';
import {deleteComment, editComment} from '../actions';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import CommentVoteControl from './CommentVoteControl';
import EditCommentForm from './EditCommentForm';

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
    // TODO: Update reducer
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
    //const commentData = comments.filter(comments => comment.id === match.params.commentID);
    //const comment = commentData.length ? commentData[0] : [];
    const commentDate = new Date(comment.timestamp);

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <div className="comment-menu text-right">
              <a className="card-link" src="#" onClick={this.openModal.bind(this, comment)}>Edit</a>
              <a className="card-link" src="#" onClick={this.deleteComment.bind(this, comment)}>Delete</a>
              <span className="card-link"><CommentVoteControl comment={comment}/></span>
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <img className="card-img-top" data-src="holder.js/100px160/" alt="100%x160"
                     src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22198%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20198%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16051c0c57c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16051c0c57c%22%3E%3Crect%20width%3D%22198%22%20height%3D%22160%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2273.4296875%22%20y%3D%2284.5%22%3E198x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                     data-holder-rendered="true"/>
                <p className="card-text">
                  {comment.author} <br/>
                  <small className="text-muted"><Moment format="MM/DD/YY">{commentDate}</Moment></small>
                </p>

              </div>
              <div className="col-md-8">
                <p className="card-text">{comment.body}</p>

              </div>
            </div>
          </div>

        </div>

        <Modal
          isOpen={this.state.isBeingEdited}
          // onAfterOpen={afterOpenFn}
          //onRequestClose={this.toggleEditModal()}
          // closeTimeoutMS={n}
          // style={customStyle}
          contentLabel="Edit Comment"
          appElement={document.getElementById('root')}
        >
          <button onClick={this.closeModal.bind(this)}>Close Modal...</button>
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

const mapStateToProps = (state, props) => ({
  comments: state.comments,
});

const mapDispatchToProps = (dispatch) => ({
  deleteComment: id => deleteComment(dispatch, id),
  editComment: comment => editComment(dispatch, comment)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);