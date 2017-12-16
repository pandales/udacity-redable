import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

function CategoriesMenu (props){

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">Redable Blog</Link>

        <div>
          <ul className="nav mr-auto">
            {props.categories.map((category) => (
              <li className="nav-item" key={category.path}>
                <NavLink
                  className='nav-link'
                  to={`/category/${category.path}`}>
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  categories: state.categories.items
});


export default connect(mapStateToProps)(CategoriesMenu);