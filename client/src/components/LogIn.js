import React from "react";
import NavButton from "./NavBotton";
import HomeIcon from "../images/home.svg";
import axios from "axios";
import "../styles/LogIn.css";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    console.log("evento enviado")
    this.setState({     /*Vacía el mensaje de error para que el usuario puede notar si reaparece el mismo error*/
      errorMessage: ""
    });
    var url = "http://localhost:5000/users/login";
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(url, data)
      .then(res => {
        console.log("bien");
        console.log(res);
        this.setState({
          success: true
        });
      })
      .catch(error => {
        console.log(error.response.statusText);
        this.setState({
          errorMessage: "ERROR: " + error.response.statusText
        });
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let errorMessage;
    if(this.state.errorMessage){
      errorMessage = <h5 id="errorMessage">{this.state.errorMessage}</h5>
    }
    if (this.state.success)
      return (
        <div id="logInContainer">
          <div id="logInSuccefullMessage">
            <h2>You have been login registered</h2>
          </div>
        </div>
      );
    return (
      <div id="logInContainer">
        <div id="logInBody">
          <h2>Log In</h2>
          <form onSubmit={this.submit}>
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              id="email"
              type="email"
              onChange={this.handleChange}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              minLength="8"
              name="password"
              id="password"
              type="password"
              onChange={this.handleChange}
              required
            />
            <label id="buttonContainer">
              <input type="submit" value="Log in" />
            </label>
          </form>
          {errorMessage}
        </div>
        <NavButton link="/" alt="home" img={HomeIcon} />
      </div>
    );
  }
}

export default LogIn;
