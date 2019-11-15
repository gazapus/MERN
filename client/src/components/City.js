import React from "react";
import "../styles/City.css";

const City = props => {
  return (
    <div id="cityContainer">
      <div id="cityImage">
        <img
          src={props.image}
          alt={props.city}
        />
      </div>
      <h3 id="cityName">{props.city}</h3>
    </div>
  );
};


export default City;