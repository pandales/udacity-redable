import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';
import Moment from 'react-moment';
import { addPost, deletePost, editPost } from './actions';
import { connect } from 'react-redux';
import  Modal  from 'react-modal';
import {AddCommentForm, CommentList} from '../comments/components';

class PostsList extends Component {

  state = {
    orderBy:'-timestamp'
  };

  handleOrderChange = (event) => {
    this.setState({orderBy: event.target.value});
  };
  
  render () {
    const { posts, category } = this.props;
    const { orderBy } = this.state;
    const postsToShow =  posts.filter( post => (!category || post.category === category));

    return (
      <div className="post-list">
        <div className="row">
          <div className="col-md-6">
            <h2 className="page-header">{this.props.title} </h2>
          </div>
          <div className="col-md-6">
            order by:
            <select value={orderBy} onChange={this.handleOrderChange}>
              <option value="timestamp">Date Asc</option>
              <option value="-timestamp">Date Des</option>
              <option value="voteScore">Score Asc</option>
              <option value="-voteScore">Score Des</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

      <ul className="posts">
        {postsToShow.sort(sortBy(orderBy)).map((post) => (
          <li key={post.id}>
            <PostCardView post={post} />
          </li>
        ))}
      </ul>
      </div>
    );
  }
}

const PostCardView = props => {

  const {post} = props;
  const postLinkObject = {
    pathname: `/post/${post.id}`,
    state: {post: post}
  };
  const postDate = new Date( post.timestamp );

  return (

      <div className="postCard card bg-light">
        <div className="card-body">
          <div className="card-title row">
            <h4 className="col-md-9"><Link to={postLinkObject}> {post.title} </Link></h4>
            <div className="col-md-3 pull-right">
              <Moment format="MM/DD/YY">{postDate}</Moment>
              -
              vote score: {post.voteScore}
            </div>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">
            written  by: {post.author} in <Link to={`/category/${post.category}`}> {post.category} category</Link>
          </h6>
          <p className="card-text">
              {post.body}
          </p>
          <Link to={postLinkObject} className="btn btn-primary">Continue reading</Link>
        </div>
      </div>
  );
};

class PostView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false
    }
  }

  deletePost() {
    console.log("delete post");
    this.props.deletePost(this.props.match.params.postID)
    this.props.history.push('/')
  }

  editPost = post => {
    this.props.editPost(post);
    this.closeModal();
  };

  openModal() {
    this.setState({
      isBeingEdited: true
    });
  }

  closeModal() {
    this.setState({
      isBeingEdited:false
    });
  }

  render() {
    const {history, match, posts, categories} = this.props;
    const postData = posts.filter(post => post.id === match.params.postID);
    const post = postData.length ? postData[0] : [];
    const postDate = new Date(post.timestamp);

    return (
      <div id="postView">
        <div className="bd-title row">
          <h2 className="col-md-9">{post.title} </h2>
          <div className="col-md-3 pull-right">
            <Moment format="MM/DD/YY">{postDate}</Moment>
            -
            vote score: {post.voteScore}
          </div>
        </div>
        <h6 className="mb-2 text-muted">
          written by: {post.author} in <Link to={`/category/${post.category}`}> {post.category} category</Link>
        </h6>
        <div className="row">
          <p className="bd-lead col-md-9">
            {post.body}
          </p>
          <div className="col-md-3 post-sidebar-menu">
            <div className="btn-group-vertical">
              <button className="go-back btn btn-secondary" onClick={this.openModal.bind(this)}>Edit Post</button>
              <button className="go-back btn btn-secondary" onClick={this.deletePost.bind(this)}>Delete Post</button>
              <button className="go-back btn btn-secondary" onClick={history.goBack}>Go Back</button>
            </div>

          </div>
        </div>
        <CommentList parentID={match.params.postID} />
        <AddCommentForm parentID={match.params.postID} />

        <Modal
          isOpen={this.state.isBeingEdited}
          // onAfterOpen={afterOpenFn}
          //onRequestClose={this.toggleEditModal()}
          // closeTimeoutMS={n}
          // style={customStyle}
          contentLabel="Edit post"
          appElement={document.getElementById('root')}
        >
          <button onClick={this.closeModal.bind(this)}>Close Modal...</button>
          <EditPostForm
            post={post}
            categories={categories}
            closeModal={this.closeModal.bind(this)}
            editPost={this.editPost.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToPropsPostView = (state, props) => (
  {
    posts: state.posts.items,
    categories: state.categories.items
  });

const mapDispatchToPropsPostView = (dispatch) => ({
  deletePost: postID => deletePost(dispatch, postID),
  editPost: post => editPost(dispatch, post)
});
PostView = connect(mapStateToPropsPostView,mapDispatchToPropsPostView)(PostView);

class EditPostForm extends Component {

  constructor(props){
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

    //Object.assign(this.props.post, this.state.post);
    this.props.editPost(this.state.post);
    //this.props.closeModal();
  };

  render (){
    const { handleChangeInput, savePost } = this;
    let {category, title, author, body} = this.state.post;

    return (
      <form className="addPostForm">
        {/*
        category - Any of the categories listed in*/}
        <fieldset>
          <legend>Edit post</legend>
          <div className="form-group row">
            <label htmlFor="postCategory"  className="col-sm-2 col-form-label">Category</label>
            <select className="form-control col-sm-10" id="postCategory"
                    onChange={ handleChangeInput }
                    stateprop="category"
                    value={category}>
              {this.props.categories.map(category =>
                <option key={category.name} value={category.name}>{category.name}</option>
              )}
            </select>
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

class AddPostForm extends Component {

  constructor(props){
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

  render (){
    const { handleChangeInput, savePost } = this;
    let {category, title, author, body} = this.state;

    return (
      <form className="addPostForm">
        {/*
        category - Any of the categories listed in*/}
        <fieldset>
          <legend>Add new post</legend>
          <div className="form-group row">
            <label htmlFor="postCategory"  className="col-sm-2 col-form-label">Category</label>
            <select className="form-control col-sm-10" id="postCategory"
                    onChange={ handleChangeInput }
                    stateprop="category"
                    value={category}>
              {this.props.categories.map(category =>
                <option key={category.name} value={category.name}>{category.name}</option>
              )}
            </select>
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

const mapStateToPropsAddPostFrom = (state, props) => ({
  categories: state.categories.items
});
const mapDispatchToPropsAddPostForm = (dispatch) => ({
  addPost: (post) => addPost(dispatch, post)
});

AddPostForm = connect(mapStateToPropsAddPostFrom, mapDispatchToPropsAddPostForm)(AddPostForm);

export {
  PostView,
  PostsList,
  AddPostForm
};