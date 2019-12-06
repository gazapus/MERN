import axios from 'axios';

export function fetchRegister(_username, _email, _password, _photoURL, _firstName, _lastName, _country) {
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
        console.log('register action exitoso hasta ahora');
        console.log(res);
        dispatch(registerSucceful(res));
      })
      .catch(error => {
        console.log(error.response.statusText);
        dispatch(registerError());
      });
  };
}

export function registerSucceful(res) {
  return {
    type: 'REGISTER_SUCCEFUL',
    payload: { data: res }
  };
}

export function registerError() {
  return {
    type: 'REGISTER_ERROR'
  };
}
}
