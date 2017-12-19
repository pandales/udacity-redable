import React from 'react';
import { connect } from 'react-redux'
import PostsList from "../../posts/components/PostList";
import AddPostForm from "../../posts/components/AddPostForm";


function HomePage({posts}){

    return (
      <div id="home">
        <PostsList title="Latest Posts" posts={ posts }/>
        <AddPostForm />
      </div>
    );
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.items
});

export default connect(mapStateToProps)(HomePage);