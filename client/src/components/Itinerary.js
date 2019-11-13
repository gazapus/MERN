import React from "react";
import "../styles/Itinerary.css"

export default class Itinerary extends React.Component {
  render() {
    return (
      <div id="itineraryContainer">
        <div id="itineraryCard">
          <figure id="authorImage">
            <img src={this.props.itinerary.profilePic} alt={this.props.itinerary.authorName} />
            <figcaption>{this.props.itinerary.authorName}</figcaption>
          </figure>
          <div id="itineraryInfo">
            <h3>{this.props.itinerary.title}</h3>
            <h4>Likes: {this.props.itinerary.rating}</h4>
            <h4>{this.props.itinerary.duration} hours</h4>
            <h4>$${this.props.itinerary.price}</h4>
            <h5>{this.props.itinerary.hashtag}</h5>
          </div>
        </div>
      </div>
    );
  }
}