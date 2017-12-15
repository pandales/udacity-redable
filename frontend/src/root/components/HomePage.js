import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostsList from "../../posts/components/PostList";
import AddPostForm from "../../posts/components/AddPostForm";


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