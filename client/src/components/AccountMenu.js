import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserLogout } from '../redux/actions/loginAction';

import '../styles/AccountMenu.css';

class AccountMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen(value) {
    this.setState({
      dropdownOpen: value
    });
  }

  toggle = () => this.setOpen(!this.state.dropdownOpen);

  render() {
    var avatarURLCSSProperty = this.props.avatarURL
      ? "url('" + this.props.avatarURL + "')"
      : "url('https://bit.ly/2DZmiwk')";
    let root = document.documentElement;
    root.style.setProperty('--avatarURL', avatarURLCSSProperty);

    let items;
    if (this.props.username) {
      items = (
        <DropdownMenu>
          <DropdownItem header>{this.props.username}</DropdownItem>
          <DropdownItem>
            <Link to='/Profile' className='d-flex justify-content-center'>
              My Profile
            </Link>
          </DropdownItem>
          <DropdownItem onClick={this.props.logOut}>
            <Link to='/' className='d-flex justify-content-center'>
              Logout
            </Link>
          </DropdownItem>
        </DropdownMenu>
      );
    } else {
      items = (
        <DropdownMenu>
          <DropdownItem>
            <Link to='/LogIn' className='d-flex justify-content-center'>
              Log in
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to='/SignIn' className='d-flex justify-content-center'>
              Create Account
            </Link>
          </DropdownItem>
        </DropdownMenu>
      );
    }

    return (
      <ButtonDropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className='bottonDropdown'
      >
        <DropdownToggle className='dropdownToggleLogIn' />
        {items}
      </ButtonDropdown>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.loginReducer.token,
    avatarURL: state.loginReducer.avatarURL,
    username: state.loginReducer.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(UserLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);

//export default AccountMenu;
