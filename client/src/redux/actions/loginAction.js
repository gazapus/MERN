import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function fetchLogIn(_username, _password) {
  return dispatch => {
    var url = 'http://localhost:5000/users/login';
    var data = {
      username: _username,
      password: _password
    };
    axios
      .post(url, data)
      .then(res => {
        dispatch(UserLoginOk(res.data.token));
      })
      .catch(error => {
        console.log(error);
        dispatch(UserLoginError(error.response.data));
      });
  };
}

export function UserLoginOk(token) {
  let decoded = jwt_decode(token);
  return {
    type: 'USER_LOGIN_OK',
    payload: { 
      token: token,
      avatarURL: decoded.photoURL,
      username: decoded.username
     }
  };
}

export function UserLoginError(error) {
  return {
    type: 'USER_LOGIN_ERROR',
    payload: {error: error}
  };
}

export function UserLogOut() {
  return {
    type: 'USER_LOGOUT'
  };
}
