import React, { Component } from 'react';
import './assets/bootstrap.min.css';
import { connect } from 'react-redux';
import HomePage from './root/components';
import  CategoryView, {CategoriesMenu}  from "./categories/components";
import { PostView } from "./posts/components";
import { Route, withRouter } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <div className="App">
        <CategoriesMenu />
        <Route exact path="/" component={HomePage}/>

        <Route exact path="/category/:categoryPath" component={ CategoryView }/>

        <Route exact path="/post/:postID" component={ PostView }/>
      </div>

    );
  }
}
const mapStateToProps = (state, props) => ({
  categories: state.categories,
  posts: state.posts
});

export default withRouter(connect(mapStateToProps)(App));
