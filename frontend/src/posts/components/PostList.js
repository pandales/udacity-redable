import React, {Component} from 'react';
import sortBy from 'sort-by';
import PostCardView from './PostCardView';

function OrderSelector({orderBy, onChange}){

  return (
    <div className="col-md-6 text-right">
      order by:
      <select value={orderBy} onChange={onChange} style={{marginLeft: '10px'}}>
        <option value="timestamp">Date Asc</option>
        <option value="-timestamp">Date Des</option>
        <option value="voteScore">Score Asc</option>
        <option value="-voteScore">Score Des</option>
        <option value="title">Title</option>
      </select>
    </div>
  )
}

export default class PostsList extends Component {

  constructor(props){
    super(props);

    this.state = {
      orderBy: '-timestamp'
    };
  }

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
          <OrderSelector orderBy={orderBy} onChange={this.handleOrderChange} />
        </div>

        <ul className="posts list-unstyled">
          {postsToShow.sort(sortBy(orderBy)).map((post) => (
            <li key={post.id} style={{margin: "10px 0"}}>
              <PostCardView post={post}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}