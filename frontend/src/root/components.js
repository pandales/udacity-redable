import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { PostsList } from "../posts/components";
import { getPosts } from "../posts/actions";

class HomePage extends Component {

  componentDidMount(){
    this.props.fetchPosts();
  }
  render () {
    return (
      <div id="home">
        <PostsList posts={this.props.posts}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.items
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => getPosts(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);