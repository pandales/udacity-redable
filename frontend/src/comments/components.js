import React, {Component} from 'react';
import sortBy from 'sort-by';
import Moment from 'react-moment';
import {addComment, deleteComment, editComment, getComments} from './actions';
import {connect} from 'react-redux';
import Modal from 'react-modal';

class CommentList extends Component {

  componentDidMount() {
    const {parentID, comments} = this.props;
    if (!comments[parentID]) {
      this.props.getComments(parentID)
    }
  }

  render() {
    const {comments, parentID} = this.props;

    return (
      <div className="comment-list">
        <div className="row">
          <div className="col-md-6">
            <h4 className="page-header">Comments </h4>
          </div>
        </div>

        <ul className="comments">
          {comments[parentID] && comments[parentID].sort(sortBy("timestamp")).map((comment) => (
            <li key={comment.id}>
              <CommentView comment={comment}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToPropsCommentList = (state, props) => ({
  comments: state.comments,
});

const mapDispatchToPropCommentList = (dispatch) => ({
  deleteComment: comment => deleteComment(dispatch, comment),
  editComment: comment => editComment(dispatch, comment),
  getComments: id => getComments(dispatch, id)
});
CommentList = connect(mapStateToPropsCommentList, mapDispatchToPropCommentList)(CommentList);

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
      <div id="commentView">
        <div className="bd-title row">
          <div className="col-md-3 pull-right">
            <Moment format="MM/DD/YY">{commentDate}</Moment>
            -
            vote score: {comment.voteScore}
          </div>
        </div>
        <h6 className="mb-2 text-muted">
          written by: {comment.author}
        </h6>
        <div className="row">
          <p className="bd-lead col-md-9">
            {comment.body}
          </p>
          <div className="col-md-3 comment-sidebar-menu">
            <div className="btn-group-vertical">
              <button className="go-back btn btn-secondary" onClick={this.openModal.bind(this, comment)}>Edit comment</button>
              <button className="go-back btn btn-secondary" onClick={this.deleteComment.bind(this, comment)}>Delete comment
              </button>
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

const mapStateToPropsCommentView = (state, props) => ({
  comments: state.comments,
});

const mapDispatchToPropsCommentView = (dispatch) => ({
  deleteComment: id => deleteComment(dispatch, id),
  editComment: comment => editComment(dispatch, comment)
});
CommentView = connect(mapStateToPropsCommentView, mapDispatchToPropsCommentView)(CommentView);

class EditCommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {comment: Object.assign({}, props.comment)};

  }

  handleChangeInput = (event) => {
    const stateprop = event.target.getAttribute('stateProp');
    let commentState = this.state.comment;
    commentState[`${stateprop}`] = event.target.value;

    this.setState(commentState);
  };

  saveComment = event => {
    event.preventDefault();

    //Object.assign(this.props.comment, this.state.comment);
    this.props.editComment(this.state.comment);
    //this.props.closeModal();
  };

  render() {
    const {handleChangeInput, saveComment} = this;
    let {author, body} = this.state.comment;

    return (
      <form className="addCommentForm">
        {/*
        category - Any of the categories listed in*/}
        <fieldset>
          <legend>Edit Comment</legend>

          <div className="form-group row">
            <label htmlFor='commentAuthor' className="col-sm-2 col-form-label">Author</label>
            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="commentAuthor"
                     stateprop="author"
                     value={author}
                     onChange={handleChangeInput}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="commentBody">Body</label>
            <textarea
              className="form-control"
              id="commentBody"
              rows="3"
              stateprop="body"
              value={body}
              onChange={handleChangeInput}>

            </textarea>
          </div>

        </fieldset>
        <button className="btn btn-primary" onClick={saveComment.bind(this)}>Submit</button>
      </form>
    )
  }
}

class AddCommentForm extends Component {

  constructor(props) {
    super(props);
    this.initialState = {
      author: '',
      body: '',
      parentId: props.parentID
    };
    this.state = this.initialState;
  }

  _reset() {
    this.setState(this.initialState);
  }

  handleChangeInput = (event) => {
    const stateprop = event.target.getAttribute('stateProp');

    this.setState({[`${stateprop}`]: event.target.value});
  };

  saveComment = event => {
    event.preventDefault();
    const {addComment} = this.props;
    addComment(this.state);
    this._reset();
  };

  render() {
    const {handleChangeInput, saveComment} = this;
    let {author, body} = this.state;

    return (
      <form className="addCommentForm">
        {/*
        category - Any of the categories listed in*/}
        <fieldset>
          <legend>Add new comment</legend>

          <div className="form-group row">
            <label htmlFor='commentAuthor' className="col-sm-2 col-form-label">Author</label>
            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="commentAuthor"
                     stateprop="author"
                     value={author}
                     onChange={handleChangeInput}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="commentBody">Body</label>
            <textarea
              className="form-control"
              id="commentBody"
              rows="3"
              stateprop="body"
              value={body}
              onChange={handleChangeInput}>

            </textarea>
          </div>

        </fieldset>
        <button className="btn btn-primary" onClick={saveComment.bind(this)}>Submit</button>
      </form>
    )
  }
}

const mapStateToPropsAddCommentForm = (state, props) => ({
  categories: state.categories.items
});
const mapDispatchToPropsAddCommentForm = (dispatch) => ({
  addComment: (comment) => addComment(dispatch, comment)
});

AddCommentForm = connect(mapStateToPropsAddCommentForm, mapDispatchToPropsAddCommentForm)(AddCommentForm);

export {
  CommentView,
  CommentList,
  AddCommentForm
};