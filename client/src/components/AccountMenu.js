import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchLogout } from '../redux/actions/loginAction';

import '../styles/AccountMenu.css';

class AccountMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.setOpen = this.setOpen.bind(this);
    this.logout = this.logout.bind(this);
  }

  setOpen(value) {
    this.setState({
      dropdownOpen: value
    });
  }

  toggle = () => this.setOpen(!this.state.dropdownOpen);

  logout(){
    this.props.logOut(this.props.token);
  }

  render() {
    var avatarURLCSSProperty = this.props.avatarURL ? 'url(\'' + this.props.avatarURL + '\')' : "url('https://bit.ly/2DZmiwk')";
    let root = document.documentElement;
    root.style.setProperty('--avatarURL', avatarURLCSSProperty);

    let items;
    if (this.props.username) {
      items =
        <DropdownMenu>
          <DropdownItem header>{this.props.username}</DropdownItem>
          <DropdownItem>
            <Link to="/Profile" className="d-flex justify-content-center">
              My Profile
          </Link>
          </DropdownItem>
          <DropdownItem onClick={this.logout}>
            <Link to="/" className="d-flex justify-content-center">
              Logout
            </Link>
          </DropdownItem>
        </DropdownMenu>
    } else {
      items =
        <DropdownMenu>
          <DropdownItem>
            <Link to="/LogIn" className="d-flex justify-content-center">
              Log in
          </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/SignIn" className="d-flex justify-content-center">
              Create Account
          </Link>
          </DropdownItem>
        </DropdownMenu>
    }

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="bottonDropdown">
        <DropdownToggle className="dropdownToggleLogIn" />
        {items}
      </ButtonDropdown>
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

const mapDispatchToProps = dispatch => {
  return {
    logOut: (token) => dispatch(fetchLogout(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);


//export default AccountMenu;