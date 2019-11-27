import React from "react";
import NavButton from "./NavBotton";
import HomeIcon from "../images/home.svg";
import axios from "axios";
import "../styles/SignUp.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      url: "",
      errorMessage: "",
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    console.log("evento enviado")
    var url = "http://localhost:5000/users/register";
    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      url: this.state.url
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
    if (this.state.success)
      return (
        <div id="signUpContainer">
          <div id="signUpBody">
            <div id="succefullyRegisterMessage">
              <h2>You have been successfully registered</h2>
            </div>
          </div>
          <NavButton link="/" alt="home" img={HomeIcon} />
        </div>
      );
    return (
      <div id="signUpContainer">
        <div id="signUpBody">
          <h2>Sign Up</h2>
          <form onSubmit={this.submit}>
            <label htmlFor="userName">Name:</label>
            <input
              name="name"
              id="userName"
              type="text"
              onChange={this.handleChange}
              required
            />
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
            <label htmlFor="photo">Photo URL:</label>
            <input
              name="url"
              id="photo"
              type="url"
              onChange={this.handleChange}
            />
            <label id="buttonContainer">
              <input type="submit" value="Send" />
            </label>
          </form>
          <h5>{this.state.errorMessage}</h5>
        </div>
        <NavButton link="/" alt="home" img={HomeIcon} />
      </div>
    );
  }
}

export default SignUp;
