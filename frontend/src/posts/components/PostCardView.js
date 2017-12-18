import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import PostVoteControl from './PostVoteControl';
import {FaCommentingO, FaEdit, FaClose} from 'react-icons/lib/fa';
import {deletePost, editPost} from '../actions';
import EditPostForm from './EditPostForm';
import Modal from 'react-modal';

class PostCardView extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false
    }
  }

  deletePost() {
    console.log("delete post");
    this.props.deletePost(this.props.match.params.postID);
    this.props.history.push('/')
  }

  editPost = post => {
    this.props.editPost(post);
    this.closeModal();
  };

  openModal() {
    this.setState({
      isBeingEdited: true
    });
  }

  closeModal() {
    this.setState({
      isBeingEdited: false
    });
  }

  render() {
    const {post, categories} = this.props;
    const postLinkObject = {
      pathname: `/${post.category}/${post.id}`
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
            written by: {post.author} in <Link to={`/${post.category}`}> {post.category} category</Link>
          </h6>
          <p className="card-text">
            {post.body.substr(0, 50)}...
          </p>
          <div className="row">
            <div className="col-md-7">
              <Link to={postLinkObject} className="card-link">Read more</Link>
            </div>
            <div className="col-md-5">
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div className="close">
                  <FaClose
                    className="control-icon"
                    style={{fontSize: 25}}
                    onClick={this.deletePost.bind(this)}/>
                </div>
                <div className="edit">
                  <FaEdit
                    className="control-icon"
                    style={{fontSize: 25}}
                    onClick={this.openModal.bind(this)}/>
                </div>
                <div className="comments">
                  <FaCommentingO style={{fontSize: 25}}/> {post.commentCount}
                </div>
                <PostVoteControl post={post}/>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.isBeingEdited}
          style={{
            content: {
              bottom: 'auto',
              width: '600px',
              left: '50%',
              right: '40px',
              marginLeft: '-300px'
            }
          }}
          contentLabel="Edit post"
          appElement={document.getElementById('root')}
        >

          <a onClick={this.closeModal.bind(this)} className={'float-right'}> <FaClose size={30}/></a>
          <EditPostForm
            post={post}
            categories={categories}
            closeModal={this.closeModal.bind(this)}
            editPost={this.editPost.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => (
  {
    posts: state.posts.items,
    categories: state.categories.items
  });

const mapDispatchToProps = (dispatch) => ({
  deletePost: postID => deletePost(dispatch, postID),
  editPost: post => editPost(dispatch, post)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCardView);