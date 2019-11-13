import React from "react";
import City from "./City";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import fetchItinerariesAction from "../redux/actions/fetchItineraries";

class Itineraries extends React.Component {
 
  componentDidMount() {
    this.props.fetchItineraries(this.props.match.params.idCity);
  }

  render() {
    if (this.props.pending)
      return <Spinner color="primary" />;
    return (
      <div>
        <City city={this.props.currentCity.city} image="https://www.sia.psu.edu/sites/default/files/styles/content_header/public/nyc_skyline.jpg?itok=0Lk7TAnG"/>
        <h3>{this.props.match.params.idCity}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itineraries: state.itinerariesReducer.itineraries,
    pending: state.itinerariesReducer.pending,
    error: state.itinerariesReducer.error,
    currentCity: state.itinerariesReducer.currentCity
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