import React from 'react';
import { connect } from 'react-redux';
import NavBotton from './NavBotton';
import HomeIcon from "../images/home.svg";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      country: ''
    }
  }
  componentDidMount() {
    var url = 'http://localhost:5000/users/profile';
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "bearer " + this.props.token
      },
      url: url
    }
    axios(options).then(res =>{
      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        country: res.data.country
      })
    }).catch(err =>console.log(err))
  }

  render() {
    return (
      <div>
        <h2>{this.props.username}</h2>
        <h3>{this.state.firstName}</h3>
        <h3>{this.state.lastName}</h3>
        <h3>{this.state.country}</h3>
        <h3>{this.state.email}</h3>
        <NavBotton link="/" img={HomeIcon} alt="home" />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.loginReducer.token,
    avatarURL: state.loginReducer.avatarURL,
    username: state.loginReducer.username
  };
};

export default connect(mapStateToProps)(Profile);