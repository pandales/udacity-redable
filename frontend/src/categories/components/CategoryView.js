import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostsList from "../../posts/components/PostList";
import AddPostForm from "../../posts/components/AddPostForm";
import NotFoundPage from '../../root/components/NotFoundPage'

function  CategoryView (props) {

  const humanifyCategoryName = name => {
    return  `${name.substr(0,1).toUpperCase()}${name.substring(1)}`;
  };

  const { posts, match, categories} = props;
  const category = categories.filter( current => current.path === match.params.categoryPath);
console.log(categories, category);
  if(categories && !category.length) return (<NotFoundPage>Category not found</NotFoundPage>);

  return (
    <div className="categoryView">
      <h2>Category {humanifyCategoryName(match.params.categoryPath)}</h2>

      <PostsList posts={posts} category={match.params.categoryPath}/>
      <AddPostForm/>
    </div>
  );
}

const mapStateToPropsCategoryView = (state, props) => ({
  posts: state.posts.items,
  categories: state.categories.items
});

export default withRouter(connect(mapStateToPropsCategoryView)(CategoryView));