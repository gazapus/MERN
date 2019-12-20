import React from 'react';
import '../styles/Comment.css';
import axios from 'axios';
import Delete from '../images/delete.png';
import Edit from '../images/edit.png';
import Cancel from '../images/cancel.png';
import Ok from '../images/ok.png';
import {
  editComment,
  clearCommentEdited,
  deleteComment
} from '../redux/actions/commentAction';
import { connect } from 'react-redux';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      photoURL: '',
      editable: false,
      editing: false,
      textEditing: '',
      text: ''
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.setState({
      editable: this.props.editable,
      text: this.props.text
    });
    axios
      .get('http://localhost:5000/users/get/' + this.props.idUser)
      .then(res => {
        this.setState({
          username: res.data.username.substring(0, 12),
          photoURL: res.data.photoURL
        });
      })
      .catch(err => console.log(err));
  }

  handleEdit() {
    this.setState({
      editing: !this.state.editing,
      textEditing: ''
    });
  }
  handleEditOk(e) {
    e.preventDefault();
    this.props.editComment(
      this.props.id,
      this.state.textEditing,
      this.props.token
    );
  }
  handleChangeComment(e) {
    this.setState({
      textEditing: e.target.value
    });
  }
  handleDelete() {
    this.props.deleteComment(this.props.id, this.props.token);
  }
  render() {
    if (!this.state.editing) {
      let editable = '';
      if (this.state.editable) {
        editable = (
          <div className='buttonsComment'>
            <img src={Edit} className='editButton' onClick={this.handleEdit} />
            <img
              src={Delete}
              className='editButton'
              onClick={this.handleDelete}
            />
          </div>
        );
      }
      return (
        <div className='commentContainer'>
          <div className='commentBody'>
            <div className='userCommentInfo'>
              <img src={this.state.photoURL} alt='' />
              <p>{this.state.username}</p>
            </div>
            <div className='textComment'>
              <p>{this.state.text}</p>
            </div>
            {editable}
          </div>
        </div>
      );
    } else {
      if (this.props.commentEdited) {
        this.setState({
          text: this.state.textEditing
        });
        this.handleEdit();
        this.props.clearCommentEdited();
        return <p></p>;
      } else {
        return (
          <div className='commentContainer'>
            <div className='commentBody'>
              <div className='userCommentInfo'>
                <img src={this.state.photoURL} alt='' />
                <p>{this.state.username}</p>
              </div>
              <div className='textComment'>
                <input
                  type='text'
                  placeholder={this.props.text}
                  id='editCommentInput'
                  onChange={this.handleChangeComment}
                />
              </div>
              <div className='buttonsComment'>
                <img
                  src={Ok}
                  className='editButton'
                  onClick={this.handleEditOk}
                />
                <img
                  src={Cancel}
                  className='editButton'
                  onClick={this.handleEdit}
                />
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.loginReducer.token,
    commentEdited: state.commentsReducer.commentEdited
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editComment: (idComment, text, token) =>
      dispatch(editComment(idComment, text, token)),
    clearCommentEdited: () => dispatch(clearCommentEdited()),
    deleteComment: (idComment, token) =>
      dispatch(deleteComment(idComment, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
