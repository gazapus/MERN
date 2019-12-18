import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function getCommentsAction(idItinerary) {
  return dispatch => {
    var url = 'http://localhost:5000/comments/' + idItinerary;
    axios
      .get(url)
      .then(res => {
        console.log(res);
        dispatch(loadComments(res.data));
      })
      .catch(error => {
        console.log(error.response);
        dispatch(cantLoadComments(error.response));
      });
  };
}

export function loadComments(_comments) {
  return {
    type: 'LOAD_COMMENTS',
    payload: {
      comments: _comments
    }
  };
}

export function cantLoadComments(_error) {
  return {
    type: 'CANT_LOAD_COMMENTS',
    payload: {
      error: _error
    }
  };
}
