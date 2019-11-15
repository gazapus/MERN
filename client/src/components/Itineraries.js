import React from "react";
import City from "./City";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import fetchItinerariesAction from "../redux/actions/fetchItineraries";
import Itinerary from './Itinerary';
import '../styles/Itineraries.css';
import NavBotton from './NavBotton';
import HomeIcon from "../images/home.svg";
import LeftArrowIcon from '../images/leftArrow.png';

const ItinerariesList = props => {
  return props.itineraries.map(itinerary => {
    return (
      <li className="itineariesListElement" key={itinerary._id}>
        <Itinerary itinerary={itinerary} />
      </li>
    );
  });
};

class Itineraries extends React.Component {

  componentDidMount() {
    this.props.fetchItineraries(this.props.match.params.idCity);
  }

  render() {
    if (this.props.pending || this.props.currentCityPending)
      return <Spinner color="primary" />;
    return (
      <div id="itinerariesContainer">
        <div id="itinerariesBody">
          <City city={this.props.currentCity.city} image="https://www.sia.psu.edu/sites/default/files/styles/content_header/public/nyc_skyline.jpg?itok=0Lk7TAnG" />
          <div id="itinerariesList">
            <h5>Available Mytineraries</h5>
            <ItinerariesList itineraries={this.props.itineraries} />
          </div>
        </div>
        <div id="navBottomContainer">
          <NavBotton link="/cities" alt="back" img={LeftArrowIcon} />
          <NavBotton link="/" alt="home" img={HomeIcon} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itineraries: state.itinerariesReducer.itineraries,
    pending: state.itinerariesReducer.pending,
    error: state.itinerariesReducer.error,
    currentCity: state.itinerariesReducer.currentCity,
    currentCityPending: state.itinerariesReducer.currentCityPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: (idCity) => dispatch(fetchItinerariesAction(idCity))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Itineraries);