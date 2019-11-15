import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import fetchCitiesAction from "../redux/actions/fetchCities";
import FilterForm from "./FilterForm";
import AccountMenu from "./AccountMenu";
import GeneralMenu from "./GeneralMenu";
import City from "./City";
import NavBotton from './NavBotton';
import HomeIcon from "../images/home.svg";
import "../styles/Cities.css";

const CitiesList = props => {
  return props.cities.map(city => {
    return (
      <li key={city._id} className="cityListElement">
        <Link to={"/Itineraries/" + city._id}>
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
      let cityName = city.city.toLowerCase();
      return cityName.indexOf(cityFilter.toLowerCase()) !== -1;
    });
    this.setState({
      filteredCities
    });
  };

  render() {
    if (this.props.pending)
      return <Spinner color="primary" />;
    return (
      <div id="citiesContainer">
        <div id="citiesBodyContainer">
          <nav id="navCities">
            <AccountMenu />
            <span id="menu">
              <GeneralMenu />
            </span>
          </nav>
          <div>
            <FilterForm onChange={this.filterCities} />
            <div id="listCities">
              <CitiesList cities={this.state.filteredCities} />
            </div>
          </div>
        </div>
        <NavBotton link="/" img={HomeIcon} alt="home"/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.citiesReducer.cities,
    pending: state.citiesReducer.pending,
    error: state.citiesReducer.error
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
