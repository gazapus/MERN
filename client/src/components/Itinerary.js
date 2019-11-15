import React from "react";
import "../styles/Itinerary.css"

const HashTagList = (props) => {
  return props.hashtags.map(hashtag => {
    return <li key={hashtag} className="hashTagList" >#{hashtag}</li>
  });
}

export default class Itinerary extends React.Component {
  render() {
    return (
      <div className="itineraryContainer">
        <div className="itineraryCardContainer">
          <div className="itineraryCard">
            <figure className="authorImage">
              <img src={this.props.itinerary.profilePic} alt={this.props.itinerary.authorName} />
              <figcaption>{this.props.itinerary.authorName}</figcaption>
            </figure>
            <div className="itineraryBody">
              <h3>{this.props.itinerary.title}</h3>
              <div className="itineraryInfo">
                <h4>Likes: {this.props.itinerary.rating}</h4>
                <h4>{this.props.itinerary.duration} hours</h4>
                <h4>$${this.props.itinerary.price}</h4>
              </div>
              <ul>
                <HashTagList hashtags={this.props.itinerary.hashtag} />
              </ul>
            </div>
          </div>
          <div>
            <a href="#" className="viewAllBar">⮟ view all ⮟</a>
          </div>
        </div>
      </div>
    );
  }
}