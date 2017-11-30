import React, { Component } from 'react';
import { NavLink, Link,  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getCategoryPosts } from './actions';
import { PostsList } from "../posts/components";

class CategoriesMenu extends Component {

  componentDidMount() {

    if(!this.props.categories.length) this.props.fetchCategories();
  }

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Redable</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation" > <span className="navbar-toggler-icon"></span> </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav mr-auto">
          {this.props.categories.map( (category) => (
            <li className="nav-item" key={category.path}>
              <NavLink
                className='nav-link'
                to={`/category/${category.path}`}>
                {category.name}
              </NavLink>
            </li>
          )) }
        </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories.items
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => getCategories(dispatch)
});
CategoriesMenu = connect(mapStateToProps, mapDispatchToProps)(CategoriesMenu)



class  CategoryView extends Component {

 state = {
   categoryName:''
 };

  componentDidUpdate(){
    const { match, posts} = this.props;
    if(!posts[match.params.categoryPath]) this.props.fetchPosts(match.params.categoryPath);
  }

  humanifyCategoryName(name) {

    return  `${name.substr(0,1).toUpperCase()}${name.substring(1)}`;
  }

  render () {
    const { posts, match } = this.props;

    return (
      <div className="categoryView">
        <h2>Category {this.humanifyCategoryName(match.params.categoryPath)}</h2>

        <PostsList posts={posts[match.params.categoryPath]}/>
      </div>
    )
  }
}

const mapStateToPropsCategoryView = (state, props) => ({
  posts: state.categories.posts
});

const mapDispatchToPropsCategoryView = (dispatch) => ({
  fetchPosts: (categoryName) => getCategoryPosts(dispatch, categoryName)
});

export default withRouter(connect(mapStateToPropsCategoryView, mapDispatchToPropsCategoryView)(CategoryView));

export  {
  CategoriesMenu
};
