import React from "react";
import NavButton from "./NavBotton";
import HomeIcon from "../images/home.svg";
import axios from "axios";
import "../styles/SignUp.css";

class CountryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: []
    }
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all').then(response => {
      response.json().then(res => {
        for(let i=0; i<res.length; i++){
          let currentCountries = this.state.countries;
          currentCountries.push(res[i].name);
          this.setState({
            countries: currentCountries
          })
        }
      })
    })
  }

  render() {
    return (
      this.state.countries.map( country => {
        return (
          <option value={country} selected>{country}</option>
        )
      })
    );
  }
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoURL: "",
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      agreeTerms: "false",
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
/*
  countries = () => {
    fetch('https://restcountries.eu/rest/v2/all').then(response => {
      response.json().then(res => {
        return (res.map(country => {
          return (
            <option value={country.name} selected>{country.name}</option>
          )
        }))
      })
    })
  }
*/
  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all').then(response => {
      response.json().then(res => {
        for (let i = 0; i < 10; i++) {
          console.log(res[i].name);
        }
      });
    })
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
          <h2>Create Acoount</h2>
          <form onSubmit={this.submit}>
            <div id="photo">
              <img
                src="https://ak2.picdn.net/shutterstock/videos/32613832/thumb/1.jpg"
                alt="imagen"
              />
            </div>
            <label htmlFor="photoURL" className="labelInput">
              <span>Photo URL:</span>
              <input
                name="url"
                id="photoURL"
                type="url"
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="username" className="labelInput">
              <span>Username</span>
              <input
                name="username"
                id="username"
                type="text"
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="password" className="labelInput">
              <span>Password:</span>
              <input
                minLength="8"
                name="password"
                id="password"
                type="password"
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="firstName" className="labelInput">
              <span>First Name:</span>
              <input
                name="firstName"
                id="firstName"
                type="text"
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="lastName" className="labelInput">
              <span>Last Name:</span>
              <input
                name="lastName"
                id="lastName"
                type="text"
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor="email" className="labelInput">
              <span>Email:</span>
              <input
                name="email"
                id="email"
                type="email"
                onChange={this.handleChange}
                required
              />
            </label>
            <label className="labelInput">
              <span>Country:</span>
              <select name="countries">
                <CountryList />
              </select>
            </label>
            <label htmlFor="agreeTerms" id="agreeTerms" >
              <input
                type="checkbox"
                name="agreeTerms"
                value={"false" === this.state.agreeTerms}
                required
                onChange={this.handleChange}
              />
              I agree to MYtinerary
              <a href="#">Terms and Conditions</a>
            </label>
            <label id="buttonContainer">
              <input type="submit" value="OK" />
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
