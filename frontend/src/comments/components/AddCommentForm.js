import React, {Component} from 'react';
import {addComment} from '../actions';
import {connect} from 'react-redux';
import {postUpdated} from "../../posts/actions";

class AddCommentForm extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      author: '',
      body: '',
      parentId: props.post.id
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
    const {addComment, post, notifyPostUpdate} = this.props;
    addComment(this.state);
    post.commentCount += 1;
    console.log(post);
    notifyPostUpdate(post);
    this._reset();
  };

  render() {
    const {handleChangeInput, saveComment} = this;
    let {author, body} = this.state;

    return (
      <form className="addCommentForm crud-form add">
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

const mapStateToProps = (state, props) => ({
  categories: state.categories.items
});
const mapDispatchToProps = (dispatch) => ({
  addComment: (comment) => addComment(dispatch, comment),
  notifyPostUpdate: post => dispatch(postUpdated(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm);