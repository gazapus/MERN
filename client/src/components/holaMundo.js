import React from "react";
import { connect } from "react-redux";
import { hola, chau } from "../redux/actions/holaMundoAction";

class holaComponent extends React.Component {
  
  render() {
    return (
      <div>
        <h1>{this.props.saludo}</h1>
        <h3>{this.props.valor}</h3>
        <button onClick={this.props.saludar}>hola</button>
        <button onClick={this.props.despedir}>chau</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    saludo: state.saludo,
    valor: state.valor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saludar: () => dispatch(hola()),
    despedir: () => dispatch(chau())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(holaComponent);

