import React from "react";
import "../styles/Itinerary.css";
import Activities from "./Activities";
import fetchActivitiesAction from '../redux/actions/fetchActivities';
import { connect } from "react-redux";
import { Collapse } from 'reactstrap';

const HashTagList = props => {
  return props.hashtags.map(hashtag => {
    return (
      <li key={hashtag} className="hashTagList">
        #{hashtag}
      </li>
    );
  });
};

class Itinerary extends React.Component {

  
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.toggle();
    console.log('The link was clicked.');
    this.props.fetchActivities(this.props.itinerary._id);
  }

  render() {
    return (
      <div className="itineraryContainer">
        <div className="itineraryCardContainer">
          <div className="itineraryCard">
            <figure className="authorImage">
              <img
                src={this.props.itinerary.profilePic}
                alt={this.props.itinerary.authorName}
              />
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
            <a href="#" className="viewAllBar" onClick={this.handleClick }>
              ⮟ view all ⮟
            </a>
          </div>
          <Collapse isOpen={this.state.isOpen}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
          similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
          dignissimos esse fuga! Minus, alias.</p>
          </Collapse>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activitiesReducer.activities,
    pending: state.activitiesReducer.pending,
    error: state.activitiesReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchActivities: (idItinerary) => dispatch(fetchActivitiesAction(idItinerary))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Itinerary);