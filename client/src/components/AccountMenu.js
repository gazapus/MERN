import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
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
    console.log(jwt_decode(this.props.token));
    let root = document.documentElement;
    let decodedAvatarURL = jwt_decode(this.props.token).photoURL;
    if(decodedAvatarURL){
      let avatarURLString = 'url(\'' + decodedAvatarURL + '\')';
      console.log(avatarURLString);
      root.style.setProperty('--avatarURL', avatarURLString);
    }else{
      root.style.setProperty('--avatarURL', "url(''https://www.polevo.fr/assets/user_logo-51f4909c1b682e440bcf97756f60ab4c4531cf6dc6bfdf730ca0fa7fee1112e1.png')");
    }

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="bottonDropdown">
        <DropdownToggle className="dropdownToggleLogIn" />
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
      </ButtonDropdown>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.loginReducer.token
  };
};

export default connect(mapStateToProps)(AccountMenu);


//export default AccountMenu;