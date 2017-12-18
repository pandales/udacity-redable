import React, { Component } from 'react';
import './styles/bootstrap.min.css';
import { connect } from 'react-redux';
import HomePage from './root/components/HomePage';
import  CategoryView  from "./categories/components/CategoryView";
import  CategoriesMenu  from "./categories/components/CategoriesMenu";
import  PostView  from "./posts/components/PostView";
import { Route, withRouter } from 'react-router-dom';
import { getPosts } from "./posts/actions";
import { getCategories } from './categories/actions';
import NotFoundPage from "./root/components/NotFoundPage"
import './App.css';

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

          <Route exact path="/:categoryPath" component={ CategoryView }/>

          <Route exact path="/:categoryPath/:postID" component={ PostView }/>

          <Route path="*" component={NotFoundPage}> Page not found</Route>
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