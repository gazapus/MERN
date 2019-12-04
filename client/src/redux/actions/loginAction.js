import axios from "axios";

export const FETCH_USER = 'FETCH_USER';

export default function fetchLogIn(usermail, password) {
     var token;
     var url = "http://localhost:5000/users/login";
     var data = {
          email: usermail,
          password: password
     }
     axios
     .post(url, data)
     .then(res => {
          console.log("log in action exitoso hasta ahora");
          console.log(res);
          token = res.token;
     })
     .catch(error => {
          console.log(error.response.statusText);
     });
     return {
      type: FETCH_USER,
      payload: {token: token}
  }
}