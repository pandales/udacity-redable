import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import Moment from 'react-moment';
import PostVoteControl from './PostVoteControl';
import Modal from 'react-modal';
import {deletePost, editPost} from '../actions';
import EditPostForm from './EditPostForm';
import CommentList from '../../comments/components/CommentList';
import AddCommentForm from '../../comments/components/AddCommentForm';

 class PostView extends Component {

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
    const {history, match, posts, categories} = this.props;
    const postData = posts.filter(post => post.id === match.params.postID);
    const post = postData.length ? postData[0] : [];
    const postDate = new Date(post.timestamp);

    return (
      <div id="postView">
        <div className="bd-title row">
          <h2 className="col-md-9">{post.title} </h2>
          <div className="col-md-3 pull-right data">
            <Moment format="MM/DD/YY">{postDate}</Moment>
          </div>
        </div>
        <h6 className="mb-2 text-muted">
          written by: {post.author} in <Link to={`/category/${post.category}`}> {post.category} category</Link>
        </h6>
        <div className="row">
          <p className="bd-lead col-md-9">
            {post.body}
          </p>
          <div className="col-md-3 post-sidebar-menu">
            <div className="row">
              <PostVoteControl post={post} />
            </div>
            <div className="btn-group-vertical">
              <button className="go-back btn btn-secondary" onClick={this.openModal.bind(this)}>Edit Post</button>
              <button className="go-back btn btn-secondary" onClick={this.deletePost.bind(this)}>Delete Post</button>
              <button className="go-back btn btn-secondary" onClick={history.goBack}>Go Back</button>
            </div>

          </div>
        </div>
        <CommentList parentID={match.params.postID}/>
        <AddCommentForm parentID={match.params.postID}/>

        <Modal
          isOpen={this.state.isBeingEdited}
          // onAfterOpen={afterOpenFn}
          //onRequestClose={this.toggleEditModal()}
          // closeTimeoutMS={n}
          // style={customStyle}
          contentLabel="Edit post"
          appElement={document.getElementById('root')}
        >
          <button onClick={this.closeModal.bind(this)}>Close Modal...</button>
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
  ...mapDispatchToProps,
  deletePost: postID => deletePost(dispatch, postID),
  editPost: post => editPost(dispatch, post)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);