import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import Moment from 'react-moment';
import PostVoteControl from './PostVoteControl';
import Modal from 'react-modal';
import {deletePost, editPost, getPost, resetCurrentPost} from '../actions';
import EditPostForm from './EditPostForm';
import CommentList from '../../comments/components/CommentList';
import AddCommentForm from '../../comments/components/AddCommentForm';
import {FaClose} from 'react-icons/lib/fa';
import NotFoundPage from '../../root/components/NotFoundPage'

class PostView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
    };
  }

  deletePost() {
    console.log("delete post");
    this.props.deletePost(this.props.match.params.postID);
    this.props.history.push('/')
  }

  editPost(post) {
    this.setState({post: post});

    // update reducer
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

  componentDidMount(){
    this.props.getPost(this.props.match.params.postID);
  }

  componentWillUnmount(){
    this.props.resetCurrentPost();
  }
  render() {
    const {history, posts, categories, post} = this.props;
    if(posts && (!post || !Object.keys(post).length)) return (<NotFoundPage>Post not found</NotFoundPage>);

    const postDate = new Date(post.timestamp);

    return (
      <div id="postView">
        <div className="row">
          <div className="col-sm-9">
            <div className="bd-title ">
              <h2>{post.title} </h2>
            </div>
            <h6 className="mb-2 text-muted">
              written by: {post.author} in <Link to={`/${post.category}`}> {post.category} category </Link>
              on <Moment format="MMM DD of YYYY">{postDate}</Moment>
            </h6>
            <p>
              {post.body}
            </p>
          </div>
          <div className="col-sm-3 post-sidebar-menu">
            <div className="float-right" style={{marginBottom: 10}}>
              <PostVoteControl post={post} isCurrent={true}/>
            </div>
            <div className="btn-group-vertical float-right">
              <button className="btn btn-secondary" onClick={this.openModal.bind(this)}>Edit Post</button>
              <button className="btn btn-secondary" onClick={this.deletePost.bind(this)}>Delete Post</button>
              <button className="btn btn-secondary" onClick={history.goBack}>Go Back</button>
            </div>
          </div>
        </div>

        <CommentList post={post}/>

        <AddCommentForm post={post}/>

        <Modal
          isOpen={this.state.isBeingEdited}
           style={{
             content:{
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
    post: state.posts.currentPost,
    categories: state.categories.items
  });

const mapDispatchToProps = (dispatch) => ({
  deletePost: postID => deletePost(dispatch, postID),
  editPost: post => editPost(dispatch, post),
  getPost: postID => getPost(dispatch, postID),
  resetCurrentPost: () => dispatch(resetCurrentPost())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);