import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { PostsList, AddPostForm } from "../posts/components";


class HomePage extends Component {

  render () {
    return (
      <div id="home">
        <PostsList title="Latest Posts" posts={ this.props.posts }/>
        <AddPostForm />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.items
});

export default connect(mapStateToProps)(HomePage);