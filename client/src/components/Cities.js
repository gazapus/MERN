import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import fetchCitiesAction from "../redux/actions/fetchCities";
import FilterForm from "./FilterForm";
import AccountMenu from "./AccountMenu";
import GeneralMenu from "./GeneralMenu";
import City from "./City";
import Home from "../images/home.svg";

import "../styles/Cities.css";

const CitiesList = props => {
  return props.cities.map(city => {
    return (
      <li key={city._id} className="cityList">
        <Link to="/Itineraries:">
          <City
            image="https://www.sia.psu.edu/sites/default/files/styles/content_header/public/nyc_skyline.jpg?itok=0Lk7TAnG"
            city={city.city}
          />
        </Link>
      </li>
    );
  });
};

class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCities: []
    };
  }

  componentDidMount() {
    this.props.fetchCities();
    this.setState({
      filteredCities: this.props.cities
    });
  }

  filterCities = cityFilter => {
    let filteredCities = this.props.cities;
    filteredCities = filteredCities.filter(city => {
      let cityName = city.city.toLowerCase() + city.country.toLowerCase();
      return cityName.indexOf(cityFilter.toLowerCase()) !== -1;
    });
    this.setState({
      filteredCities
    });
  };

  render() {
    if (this.props.pending) return <Spinner color="primary" />;
    return (
      <div id="citiesContainer">
        <nav>
          <AccountMenu />
          <span id="menu">
            <GeneralMenu />
          </span>
        </nav>
        <div id="citiesContainer">
          <FilterForm onChange={this.filterCities} />
          <CitiesList cities={this.state.filteredCities} />
          <Link to="/">
            <div id="homeIconContainer">
              <img id="homeIcon" src={Home} alt="home" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    pending: state.pending,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCities: () => dispatch(fetchCitiesAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cities);
