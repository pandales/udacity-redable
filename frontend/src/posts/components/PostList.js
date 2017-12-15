import React, {Component} from 'react';
import sortBy from 'sort-by';
import PostCardView from './PostCardView';


export default class PostsList extends Component {

  state = {
    orderBy: '-timestamp'
  };

  handleOrderChange = (event) => {
    this.setState({orderBy: event.target.value});
  };

  render() {
    const {posts, category} = this.props;
    const {orderBy} = this.state;
    const postsToShow = posts.filter(post => (!category || post.category === category));

    return (
      <div className="post-list">
        <div className="row">
          <div className="col-md-6">
            <h2 className="page-header">{this.props.title} </h2>
          </div>
          <div className="col-md-6">
            order by:
            <select value={orderBy} onChange={this.handleOrderChange}>
              <option value="timestamp">Date Asc</option>
              <option value="-timestamp">Date Des</option>
              <option value="voteScore">Score Asc</option>
              <option value="-voteScore">Score Des</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        <ul className="posts list-unstyled">
          {postsToShow.sort(sortBy(orderBy)).map((post) => (
            <li key={post.id}>
              <PostCardView post={post}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}