import React from 'react';
import { connect } from 'react-redux';
import AccountMenu from './AccountMenu';
import jwt_decode from 'jwt-decode';
import NavBotton from './NavBotton';
import HomeIcon from "../images/home.svg";

class Profile extends React.Component {

  render() {
       /*Esta informacion debe ser traida de la base de datos. No se
          deben guardar en el token. Se debe autentificar en el backend*/
       let decoded = jwt_decode(this.props.token);
       let fullName = decoded.firstName + " " + decoded.lastName;
       let email = decoded.email;
       let country = decoded.country;
    return (
         <div>
              <h2>{this.props.username}</h2>
              <h3>{fullName}</h3>
              <h3>{email}</h3>
              <h3>{country}</h3>
              <NavBotton link="/" img={HomeIcon} alt="home"/>
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


//export default AccountMenu;