import axios from 'axios';

export function fetchLogIn(usermail, password) {
  return dispatch => {
    var url = 'http://localhost:5000/users/login';
    var data = {
      email: usermail,
      password: password
    };
    axios
      .post(url, data)
      .then(res => {
        console.log('log in action exitoso hasta ahora');
        console.log(res);
        dispatch(UserLoginOk(res.data.token));
      })
      .catch(error => {
        console.log(error.response.statusText);
        dispatch(UserLoginError());
      });
  };
}

export function UserLoginOk(token) {
  return {
    type: 'USER_LOGIN_OK',
    payload: { token: token }
  };
}

export function UserLoginError() {
  return {
    type: 'USER_LOGIN_ERROR'
  };
}

export function UserLogOut() {
  return {
    type: 'USER_LOGOUT'
  };
}
