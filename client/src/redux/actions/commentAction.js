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

export function editComment(idComent, _comment, token) {
  return dispatch => {
    var url = 'http://localhost:5000/comments/edit';
    const data = {
      idComment: idComent,
      textComment: _comment,
    };
    const options = {
      method: 'PUT',
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'bearer ' + token
      },
      url: url
    };
    axios(options)
      .then(res => {
        dispatch(updateEditComment(res.data));
        console.log('comentario editado');
      })
      .catch(err => {
        alert('no se pudo cambiar comentario');
      });
  };
}

export function deleteComment(idComent, token) {
  return dispatch => {
    var url = 'http://localhost:5000/comments/delete';
    const data = {
      idComment: idComent
      };
    const options = {
      method: 'DELETE',
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'bearer ' + token
      },
      url: url
    };
    axios(options)
      .then(res => {
        dispatch(updateDeletedComment(res.data));
        console.log('comentario eliminado');
      })
      .catch(err => {
        alert('no se pudo eliminar ');
      });
  };
}

export function updateEditComment(editedComment){
  console.log(editedComment);
  return {
    type: 'EDIT_COMMENT',
    payload: {
      editedComment: editedComment
    }
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

export function updateDeletedComment (deletedComment) {
  return {
    type: 'COMMENT_DELETED',
    payload: {
      deleted: deletedComment
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

export function clearCommentEdited(){
  return {
    type: 'CLEAR_COMMENT_EDITED'
  }
}