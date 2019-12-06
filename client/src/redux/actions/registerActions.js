import axios from 'axios';

export function fetchRegister(
  _username,
  _email,
  _password,
  _photoURL,
  _firstName,
  _lastName,
  _country
) {
  return dispatch => {
    var url = 'http://localhost:5000/users/register';
    var data = {
      username: _username,
      email: _email,
      password: _password,
      photoURL: _photoURL,
      firstName: _firstName,
      lastName: _lastName,
      country: _country
    };
    axios
      .post(url, data)
      .then(res => {
        console.log('register action succes for now');
        console.log(res);
        dispatch(registerSucceful());
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(registerError(err.response.data));
      });
  };
}

export function registerSucceful() {
  return {
    type: 'REGISTER_SUCCEFUL'
  };
}

export function registerError(error) {
  return {
    type: 'REGISTER_ERROR',
    payload: { errorMessage: error }
  };
}

export function finishRegister() {
  return {
    type: 'FINISH_REGISTER'
  };
}
