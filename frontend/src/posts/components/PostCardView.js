import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import PostVoteControl from './PostVoteControl';

export default class PostCardView extends Component {

  render() {
    const {post} = this.props;
    const postLinkObject = {
      pathname: `/post/${post.id}`,
      state: {post: post}
    };
    const postDate = new Date(post.timestamp);

    return (

      <div className="postCard card bg-light">
        <div className="card-body">
          <div className="card-title row">
            <h5 className="col-md-9"><Link to={postLinkObject}> {post.title} </Link></h5>
            <div className="col-md-3 pull-right date text-right">
              <Moment format="MM/DD/YY">{postDate}</Moment>
            </div>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">
            written by: {post.author} in <Link to={`/category/${post.category}`}> {post.category} category</Link>
          </h6>
          <p className="card-text">
            {post.body}
          </p>
          <div className="card-footer row">
            <div className="col-md-8">
              <Link to={postLinkObject} className="btn btn-primary">Continue reading</Link>
            </div>
            <div className="col-md-4">
              <PostVoteControl post={post} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};