import React from 'react';
import '../styles/Itinerary.css';
import fetchActivitiesAction from '../redux/actions/fetchActivities';
import {
  getCommentsAction,
  sendComment,
  clearCommentLoadedOk
} from '../redux/actions/commentAction';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import ActivitiesCarousel from './ActivitiesCarousel';
import Comment from './Comment';
import FavOn from '../images/fav-on.png';
import FavOff from '../images/fav-off.png';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const HashTagList = props => {
  return props.hashtags.map(hashtag => {
    return (
      <li key={hashtag} className='hashTagList'>
        #{hashtag}
      </li>
    );
  });
};

class CommentsList extends React.Component {
  render() {
    let idCurrentUser = 0;
    if (this.props.currentToken != '') {
      let tokenData = jwt_decode(this.props.currentToken);
      idCurrentUser = tokenData.id;
    }
    return this.props.comments.map(comment => {
      return (
        <li className='commentElement' key={comment._id}>
          <Comment
            id={comment._id}
            text={comment.text}
            idUser={comment.idUser}
            editable={idCurrentUser === comment.idUser}
          />
        </li>
      );
    });
  }
}

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isFav: false,
      favImage: FavOff,
      newComment: ''
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSendComment = this.handleSendComment.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    if (this.props.token !== '') {
      let url =
        'http://localhost:5000/checkFavourite/' + this.props.itinerary._id;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'bearer ' + this.props.token
        },
        url: url
      };
      axios(options)
        .then(res => {
          this.setState({
            isFav: res.data,
            favImage: res.data ? FavOn : FavOff
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  closeView() {
    this.setState({
      isOpen: false
    });
  }

  getIdItinerary() {
    return this.props.itinerary._id;
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleClickOpen(e) {
    e.preventDefault();
    this.props.onOpen(this.props.itinerary._id);
    this.toggle();
    this.props.fetchActivities(this.props.itinerary._id);
    this.props.getComments(this.props.itinerary._id);
  }

  handleFavourite() {
    if (this.props.token === '') {
      return alert('Debe iniciar sesion');
    }
    this.setState({
      isFav: !this.state.isFav,
      favImage: this.state.isFav ? FavOff : FavOn
    });
    let url =
      'http://localhost:5000/favourites/update/' + this.props.itinerary._id;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'bearer ' + this.props.token
      },
      url: url
    };
    axios(options)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log('falló actualizacion de favorito');
        this.setState({
          isFav: !this.state.isFav,
          favImage: this.state.isFav ? FavOff : FavOn
        });
        alert('Debe iniciar sesión');
      });
  }

  handleClickClose(e) {
    e.preventDefault();
    this.toggle();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      newComment: e.target.value
    });
  }

  handleSendComment(e) {
    e.preventDefault();
    this.props.addNewComment(
      this.state.newComment,
      this.props.token,
      this.props.itinerary._id
    );
  }

  render() {
    if (this.props.commentLoaded) {
      this.setState({
        newComment: ''
      });
      this.props.clearCommentLoadedOk();
    }
    return (
      <div className='itineraryContainer'>
        <div className='itineraryCardContainer'>
          <div className='itineraryCard'>
            <figure className='authorImage'>
              <img
                src={this.props.itinerary.profilePic}
                alt={this.props.itinerary.authorName}
              />
              <figcaption>{this.props.itinerary.authorName}</figcaption>
            </figure>
            <div className='itineraryBody'>
              <h3>{this.props.itinerary.title}</h3>
              <div className='itineraryInfo'>
                <h4>Likes: {this.props.itinerary.rating}</h4>
                <h4>{this.props.itinerary.duration} hours</h4>
                <h4>$${this.props.itinerary.price}</h4>
                <img
                  src={this.state.favImage}
                  alt='fav'
                  onClick={this.handleFavourite}
                />
              </div>
              <ul>
                <HashTagList hashtags={this.props.itinerary.hashtag} />
              </ul>
            </div>
          </div>
          <div>
            <a
              className={this.state.isOpen ? 'invisible' : 'viewAllBar'}
              onClick={this.handleClickOpen}
              href='#'
            >
              <span>⮟ view all ⮟</span>
            </a>
          </div>
          <Collapse isOpen={this.state.isOpen}>
            <div className='activitiesListCarousel'>
              <h5>Activities: </h5>
              <ActivitiesCarousel activities={this.props.activities} />
              <h5>Comments:</h5>
              <div className='commentInputContainer'>
                <textarea
                  onChange={this.handleChange}
                  value={this.state.newComment}
                ></textarea>
                <button
                  className='buttonComment'
                  onClick={this.handleSendComment}
                >
                  Send
                </button>
              </div>
              <div>
                <CommentsList
                  comments={this.props.comments}
                  currentToken={this.props.token}
                />
              </div>
            </div>
            <a className='viewAllBar' onClick={this.handleClickClose}>
              <span>⮝ close ⮝</span>
            </a>
          </Collapse>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activitiesReducer.activities,
    pending: state.activitiesReducer.pending,
    error: state.activitiesReducer.error,
    token: state.loginReducer.token,
    comments: state.commentsReducer.comments,
    commentLoaded: state.commentsReducer.commentAdded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchActivities: idItinerary =>
      dispatch(fetchActivitiesAction(idItinerary)),
    getComments: idItinerary => dispatch(getCommentsAction(idItinerary)),
    addNewComment: (comment, token, idItinerary) =>
      dispatch(sendComment(comment, token, idItinerary)),
    clearCommentLoadedOk: () => dispatch(clearCommentLoadedOk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
