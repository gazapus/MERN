import React from 'react';
import '../styles/Comment.css';
import axios from 'axios';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      photoURL: '',
      editable: false
    };
  }
  componentDidMount() {
       this.setState({
            editable: this.props.editable
       })
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

  render() {
       let editable = this.state.editable ? <p>editable</p>:<p>No editable</p>
    return (
      <div className='commentContainer'>
        <div className='commentBody'>
          <div className='userCommentInfo'>
            <img src={this.state.photoURL} alt='pic' />
            <p>{this.state.username}</p>
          </div>
          <div className='textComment'>
            <p>{this.props.text}</p>
          </div>
          {editable}
        </div>
      </div>
    );
  }
}

export default Comment;
