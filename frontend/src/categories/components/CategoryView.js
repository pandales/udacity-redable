import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostsList from "../../posts/components/PostList";
import AddPostForm from "../../posts/components/AddPostForm";

function  CategoryView (props) {

  const humanifyCategoryName = name => {
    return  `${name.substr(0,1).toUpperCase()}${name.substring(1)}`;
  };

  const { posts, match} = props;

  return (
    <div className="categoryView">
      <h2>Category {humanifyCategoryName(match.params.categoryPath)}</h2>

      <PostsList posts={posts} category={match.params.categoryPath}/>
      <AddPostForm/>
    </div>
  );
}

const mapStateToPropsCategoryView = (state, props) => ({
  posts: state.posts.items
});

export default withRouter(connect(mapStateToPropsCategoryView)(CategoryView));