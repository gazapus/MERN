import React from 'react';
import NavButton from './NavBotton';
import HomeIcon from '../images/home.svg';
import { fetchLogIn, UserLogOut } from '../redux/actions/loginAction';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import '../styles/LogIn.css';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: "false"
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    this.props.fetchLogin(this.state.username, this.state.password);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let errorMessage;
    if (this.props.errorMessage) {
      errorMessage = <h5 id='errorMessage'>{this.props.errorMessage}</h5>;
    }
    if (this.props.success) {
      return (
        <div id='logInContainer'>
          <div id='logInBody'>
            <div id='logInSuccefullMessage'>
              <h2>Welcome back</h2>
            </div>
            <button onClick={this.props.logOut}>salir</button>
          </div>
          <NavButton link='/' alt='home' img={HomeIcon} />
        </div>
      );
    }
    return (
      <div id='logInContainer'>
        <div id='logInBody'>
          <h2>Login</h2>
          <form onSubmit={this.submit}>
            <label htmlFor='username' className="labelInput">
              <span>Username: </span>
              <input
                name='username'
                id='username'
                type='text'
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor='password'className="labelInput">
              <span>Password: </span>
              <input
                minLength='8'
                name='password'
                id='password'
                type='password'
                onChange={this.handleChange}
                required
              />
            </label>
            <label htmlFor='remember' id="rememberMe">
              <input
                type='checkbox'
                name='remember'
                value={'false' === this.state.remember}
                onChange={this.handleChange}
              />
              <span>Remember me </span>
            </label>
            <label id='buttonContainer'>
              <input type='submit' value='OK' />
            </label>
          </form>
          {errorMessage}
          <div id="toCreateAccount">
            <p>
              Dont have a MYtinerary account yet?<br/>
              You should create one! It's totally free and only takes a minute
            </p>
            <Link to="/SignIn">
              Create Account
            </Link>
          </div>
        </div>
        <NavButton link='/' alt='home' img={HomeIcon} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.loginReducer.success,
    token: state.loginReducer.token,
    errorMessage: state.loginReducer.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLogin: (a, b) => dispatch(fetchLogIn(a, b)),
    logOut: () => dispatch(UserLogOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
