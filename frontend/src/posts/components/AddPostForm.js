import React, {Component} from 'react';
import { addPost } from '../actions';
import {connect} from 'react-redux';

class AddPostForm extends Component {

  constructor(props) {
    super(props);
    this.initialState = {
      title: '',
      category: 'udacity',
      author: '',
      body: ''
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

  savePost = event => {
    event.preventDefault();
    this.props.addPost(this.state);
    this._reset();
  };

  render() {
    const {handleChangeInput, savePost} = this;
    let {category, title, author, body} = this.state;

    return (
      <form className="addPostForm crud-form add container">
        {/*
        category - Any of the categories listed in*/}
        <fieldset>
          <legend>Add new post</legend>
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
                     onChange={handleChangeInput}/>
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

const mapStateToProps = (state, props) => ({
  categories: state.categories.items
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => addPost(dispatch, post)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);