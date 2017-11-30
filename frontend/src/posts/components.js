import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPost } from '../utils/api';

class PostsList extends Component {

  render () {
    const { posts } = this.props;
    const postsArray =  posts && posts.length ? posts: [];
    return (
      <div className="post-list">
        <h2>Posts</h2>
      <ul className="posts">
        {postsArray.map((post) => (
          <li key={post.id}>
            <Link
              to={{
                pathname: `/post/${post.id}`,
                state: {post: post}
              }}>
              {post.title} <br/>
              {post.category}
            </Link>
          </li>
        ))}
      </ul>
      </div>
    );
  }
}

class PostView extends Component {

  state = {
    post: {}
  };

  componentDidMount(){
    const { location, match} = this.props;
    if(location.state && location.state.post){
      this.setState({post: location.state.post})
    }else{
      console.log('fetched post');
      getPost(match.params.postID)
        .then(response => this.setState({post: response}));
    }
  }

  render () {
    const { post } = this.state;
    const { history } = this.props;

    return (
      <div className="post">
        <button className="go-back" onClick={history.goBack}>Go Back</button>
        <h2 className="post">{post.title}</h2>
        <p>{post.body}</p>
      </div>
    );
  }
}

export {
  PostView,
  PostsList
};