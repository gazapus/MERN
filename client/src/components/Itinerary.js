import React from "react";
import "../styles/Itinerary.css";
import fetchActivitiesAction from '../redux/actions/fetchActivities';
import { connect } from "react-redux";
import { Collapse } from 'reactstrap';
import ActivitiesCarousel from './ActivitiesCarousel';

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
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClickOpen(e) {
    e.preventDefault();
    this.toggle();
    this.props.fetchActivities(this.props.itinerary._id);
  }

  handleClickClose(e){
    e.preventDefault();
    this.toggle();
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
            <a className={this.state.isOpen? "invisible":"viewAllBar"} onClick={this.handleClickOpen }>
              <span>⮟ view all ⮟</span>
            </a>
          </div>
          <Collapse isOpen={this.state.isOpen}>
          <div className="activitiesListCarousel">
            <ActivitiesCarousel activities={this.props.activities}/>
          </div>
            <a className="viewAllBar" onClick={this.handleClickClose }>
              <span>⮝ close ⮝</span>
            </a>
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