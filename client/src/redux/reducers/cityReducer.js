import {FETCH_CITIES_PENDING, FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR} from '../actions/cityActions';

const defaultState = {
  pending: true,
  cities: [],
  error: null
};

function citiesReducer(state = defaultState, action) {
  switch(action.type) {
      case FETCH_CITIES_PENDING: 
          return {
              ...state,
              pending: true
          }
      case FETCH_CITIES_SUCCESS:
          return {
              ...state,
              pending: false,
              cities: action.payload.cities
          }
      case FETCH_CITIES_ERROR:
          return {
              ...state,
              pending: false,
              error: action.error
          }
      default: 
          return state;
  }
}

export default citiesReducer;