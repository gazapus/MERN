import axios from 'axios';
import qs from 'qs';

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

export function sendComment(_comment, token, _idItinerary) {
  console.log(_comment);
  console.log(token);
  return dispatch => {
    var url = 'http://localhost:5000/comments/add';
    const data = {
      textComment: _comment,
      idItinerary: _idItinerary
    };
    const options = {
      method: 'POST',
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'bearer ' + token
      },
      url: url
    };
    axios(options)
      .then(res => {
        console.log(res);
        dispatch(updateComments(res.data));
        console.log('comentario agregado');
      })
      .catch(err => {
        alert('no se pudo enviar comentario');
      });
  };
}

export function updateComments(newComment) {
  return {
    type: 'COMMENT_ADDED',
    payload: {
      newComment: newComment
    }
  };
}

export function loadComments(_comments) {
  return {
    type: 'LOAD_COMMENTS',
    payload: {
      comments: _comments.reverse()
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

export function clearCommentLoadedOk() {
  return {
    type: 'CLEAR_COMMENT_LOADED'
  };
}
