import React from "react";
import City from "./City";

export default class Itineraries extends React.Component {
  render() {
    return (
      <div>
        <City image={this.props.image} city={this.props.city} />
        <h3>Avalaible MYtineraries:</h3>
        
      </div>
    );
  }
}
