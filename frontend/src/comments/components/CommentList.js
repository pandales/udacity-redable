import React, {Component} from 'react';
import sortBy from 'sort-by';
import {deleteComment, editComment, getComments} from '../actions';
import {connect} from 'react-redux';
import CommentView from './CommentView'

class CommentList extends Component {

  componentDidMount() {
    const {parentID, comments} = this.props;
    if (!comments[parentID]) {
      this.props.getComments(parentID)
    }
  }

  render() {
    const {comments, parentID} = this.props;

    return (
      <div className="comment-list">
        <div className="row">
          <div className="col-md-6">
            <h4 className="page-header">Comments </h4>
          </div>
        </div>

        <ul className="comments list-unstyled">
          {comments[parentID] && comments[parentID].sort(sortBy("timestamp")).map((comment) => (
            <li key={comment.id}>
              <CommentView comment={comment}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => ({
  comments: state.comments,
});
const mapDispatchToProps = (dispatch) => ({
  deleteComment: comment => deleteComment(dispatch, comment),
  editComment: comment => editComment(dispatch, comment),
  getComments: id => getComments(dispatch, id)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);