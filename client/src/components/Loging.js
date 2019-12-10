import React from 'react';
import { UserLoginOk } from '../redux/actions/loginAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Loging extends React.Component {

     componentDidMount() {
          this.props.UserLoginOk(this.props.match.params.token);
     }

     render() {
          if(this.props.success){
               return(
                    <Redirect to='/' />
               )
          }
          return (
               <div>
                    <h2>Accediendo...</h2>
                    <h3>{this.props.errorMessage}</h3>
               </div>
          )
     }
}

const mapStateToProps = state => {
     return {
          success: state.loginReducer.success,
          errorMessage: state.loginReducer.errorMessage
     };
};

const mapDispatchToProps = dispatch => {
     return {
          UserLoginOk: (token) => dispatch(UserLoginOk(token))
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loging);
