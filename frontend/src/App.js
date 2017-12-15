import React, { Component } from 'react';
import './assets/bootstrap.min.css';
import { connect } from 'react-redux';
import HomePage from './root/components/HomePage';
import  CategoryView  from "./categories/components/CategoryView";
import  CategoriesMenu  from "./categories/components/CategoriesMenu";
import  PostView  from "./posts/components/PostView";
import { Route, withRouter } from 'react-router-dom';
import { getPosts } from "./posts/actions";
import { getCategories } from './categories/actions';

class App extends Component {

  componentDidMount(){
    if(!this.props.posts.length) this.props.fetchPosts();
    if(!this.props.categories.length) this.props.fetchCategories();
  }

  render() {

    return (
      <div className="App">
        <CategoriesMenu />
        <div className="container">
          <Route exact path="/" component={ HomePage }/>

          <Route exact path="/category/:categoryPath" component={ CategoryView }/>

          <Route exact path="/post/:postID" component={ PostView }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories,
  posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => getPosts(dispatch),
  fetchCategories: () => getCategories(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
