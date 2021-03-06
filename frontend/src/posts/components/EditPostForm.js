import React, {Component} from 'react';

export default class EditPostForm extends Component {

  constructor(props) {
    super(props);
    this.state = {post: Object.assign({}, props.post)};

  }

  handleChangeInput = (event) => {
    const stateprop = event.target.getAttribute('stateProp');
    let postState = this.state.post;
    postState[`${stateprop}`] = event.target.value;

    this.setState(postState);
  };

  savePost = event => {
    event.preventDefault();

    this.props.editPost(this.state.post);
  };

  render() {
    const {handleChangeInput, savePost} = this;
    let {category, title, author, body} = this.state.post;

    return (
      <form className="editPostForm crud-form edit">
        {/*
        category - Any of the categories listed in*/}
        <fieldset>
          <legend>Edit post</legend>
          <div className="form-group row">
            <label htmlFor="postCategory" className="col-sm-2 col-form-label">Category</label>
            <div className="col-sm-10">
              <select className="form-control" id="postCategory"
                      onChange={handleChangeInput}
                      stateprop="category"
                      value={category}>
                {this.props.categories.map(category =>
                  <option key={category.name} value={category.name}>{category.name}</option>
                )}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor='postTitle' className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="postTitle"
                     stateprop="title"
                     value={title}
                     onChange={handleChangeInput.bind(this)}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor='postAuthor' className="col-sm-2 col-form-label">Author</label>
            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="postAuthor"
                     stateprop="author"
                     value={author}
                     onChange={handleChangeInput}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="postBody">Body</label>
            <textarea
              className="form-control"
              id="postBody"
              rows="3"
              stateprop="body"
              value={body}
              onChange={handleChangeInput}>

            </textarea>
          </div>

        </fieldset>
        <button className="btn btn-primary" onClick={savePost.bind(this)}>Submit</button>
      </form>
    )
  }
}