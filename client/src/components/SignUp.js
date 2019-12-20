import React from 'react';
import NavButton from './NavBotton';
import HomeIcon from '../images/home.svg';
import {
  fetchRegister,
  finishRegister
} from '../redux/actions/registerActions';
import { connect } from 'react-redux';
import isImageUrl from 'is-image-url';
import '../styles/SignUp.css';

class CountryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all').then(response => {
      response.json().then(res => {
        for (let i = 0; i < res.length; i++) {
          let currentCountries = this.state.countries;
          currentCountries.push(res[i].name);
          this.setState({
            countries: currentCountries
          });
        }
      });
    });
  }

  render() {
    return this.state.countries.map(country => {
      return (
        <option value={country} key={country}>
          {country}
        </option>
      );
    });
  }
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoBuffer:
        'https://www.polevo.fr/assets/user_logo-51f4909c1b682e440bcf97756f60ab4c4531cf6dc6bfdf730ca0fa7fee1112e1.png',
      photoURL: '',
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      country: 'Afghanistan',
      agreeTerms: 'false'
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.updatePhoto = this.updatePhoto.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.props.finishRegister());
  }

  submit(event) {
    event.preventDefault();
    this.props.registerAction(
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.photoURL,
      this.state.firstName,
      this.state.lastName,
      this.state.country
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updatePhoto() {
    if (isImageUrl(this.state.photoURL)) {
      this.setState({
        photoBuffer: this.state.photoURL
      });
    } else {
      this.setState({
        photoBuffer:
          'https://www.polevo.fr/assets/user_logo-51f4909c1b682e440bcf97756f60ab4c4531cf6dc6bfdf730ca0fa7fee1112e1.png'
      });
    }
  }

  render() {
    if (this.props.success)
      return (
        <div id='signUpContainer'>
          <div id='signUpBody'>
            <div id='succefullyRegisterMessage'>
              <h2>
                You have been successfully registered
                <br />
                Check your mail inbox and confirm your account
              </h2>
            </div>
          </div>
          <NavButton link='/' alt='home' img={HomeIcon} />
        </div>
      );
    return (
      <div id='signUpContainer'>
        <div id='signUpBody'>
          <h2>Create Acoount</h2>
          <form onSubmit={this.submit}>
            <div id='photo'>
              <img src={this.state.photoBuffer} alt='' />
            </div>
            <label htmlFor='photoURL' className='labelInput'>
              <span>Photo URL:</span>
              <input
                name='photoURL'
                id='photoURL'
                type='url'
                onChange={this.handleChange}
                onBlur={this.updatePhoto}
              />
            </label>
            <label htmlFor='username' className='labelInput'>
              <span>Username</span>
              <input
                name='username'
                id='username'
                type='text'
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor='password' className='labelInput'>
              <span>Password:</span>
              <input
                minLength='8'
                name='password'
                id='password'
                type='password'
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor='firstName' className='labelInput'>
              <span>First Name:</span>
              <input
                name='firstName'
                id='firstName'
                type='text'
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor='lastName' className='labelInput'>
              <span>Last Name:</span>
              <input
                name='lastName'
                id='lastName'
                type='text'
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor='email' className='labelInput'>
              <span>Email:</span>
              <input
                name='email'
                id='email'
                type='email'
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor='country' className='labelInput'>
              <span>Country:</span>
              <select name='country' onChange={this.handleChange}>
                <CountryList />
              </select>
            </label>
            <label htmlFor='agreeTerms' id='agreeTerms'>
              <input
                type='checkbox'
                name='agreeTerms'
                value={'false' === this.state.agreeTerms}
                onChange={this.handleChange}
                required
              />
              I agree to MYtinerary
              <a href='#'>Terms and Conditions</a>
            </label>
            <label id='buttonContainer'>
              <input type='submit' value='OK' />
            </label>
          </form>
          <h5>{this.props.errorMessage}</h5>
        </div>
        <NavButton link='/' alt='home' img={HomeIcon} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.registerReducer.success,
    errorMessage: state.registerReducer.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerAction: (
      _username,
      _email,
      _password,
      _photoURL,
      _firstName,
      _lastName,
      _country
    ) =>
      dispatch(
        fetchRegister(
          _username,
          _email,
          _password,
          _photoURL,
          _firstName,
          _lastName,
          _country
        )
      ),
    finishRegister: () => dispatch(finishRegister())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
