import React from "react";
import { Link } from "react-router-dom";
import NavButton from "./NavBotton";
import HomeIcon from "../images/home.svg";
import "../styles/SignUp.css";

class SignUp extends React.Component {

  constructor(props){
    super(props);
      this.state = {
        name: "",
        email: "",
        password: "",
        url: ""
      }
      this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state[event.target.name])
  }

 
  render() {
    return (
      <div id="signUpContainer">
        <div id="signUpBody">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="userName">Name:</label>
            <input name="name" id="userName" type="text" onChange={this.handleChange}/>
            <label htmlFor="email">Email:</label>
            <input name="email" id="email" type="email" onChange={this.handleChange}/>
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" type="password" onChange={this.handleChange} />
            <label htmlFor="photo">Photo URL:</label>
            <input name="url" id="photo" type="url" onChange={this.handleChange}/>
            <label id="buttonContainer">
              <input type="submit" value="Send" />
            </label>
          </form>
        </div>
        <NavButton link="/" alt="home" img={HomeIcon} />
      </div>
    );
  }
}

export default SignUp;
