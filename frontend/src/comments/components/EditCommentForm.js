import React, {Component} from 'react';

export default class EditCommentForm extends Component {

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
      <form className="editCommentForm crud-form edit">
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