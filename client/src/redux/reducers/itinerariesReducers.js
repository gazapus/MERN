import {
  FETCH_ITINERARIES_PENDING,
  FETCH_ITINERARIES_SUCCESS,
  FETCH_ITINERARIES_ERROR,
  SET_CURRENT_CITY
} from '../actions/itinerariesActions';

const defaultState = {
  pending: true,
  itineraries: [],
  error: null,
  currentCity: {},
  currentCityPending: true
};

function itinerariesReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_ITINERARIES_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_ITINERARIES_SUCCESS:
      return {
        ...state,
        pending: false,
        itineraries: action.payload.itineraries
      };
    case FETCH_ITINERARIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case SET_CURRENT_CITY:
      console.log('hola');
      return {
        ...state,
        currentCity: action.payload.currentCity[0], //saque [0]
        currentCityPending: false
      };
    default:
      return state;
  }
}

export default itinerariesReducer;
