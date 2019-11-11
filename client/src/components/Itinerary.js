import React from "react";

export default class Itinerary extends React.Component {
  render() {
    return (
      <div>
        <h3>props.itinerary.title</h3>
        <h4>props.itinerary.rating</h4>
        <h4>props.itinerary.duration</h4>
        <h4>props.itinerary.price</h4>
        <h5>props.itinerary.hashtag</h5>
        <img src={props.itinerary.profilePic} alt={this.props.itinerary.authorName}/>
        <p>props.itinerary.authorName</p>
      </div>
    );
  }
}