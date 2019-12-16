export const FETCH_ITINERARIES_PENDING = 'FETCH_ITINERARIES_PENDING';
export const FETCH_ITINERARIES_SUCCESS = 'FETCH_ITINERARIES_SUCCESS';
export const FETCH_ITINERARIES_ERROR = 'FETCH_ITINERARIES_ERROR';
export const SET_CURRENT_CITY = 'SET_CURRENT_CITY';

export function fetchItinerariesPending() {
  return {
    type: FETCH_ITINERARIES_PENDING
  };
}

export function fetchItinerariesSuccess(_itineraries) {
  return {
    type: FETCH_ITINERARIES_SUCCESS,
    payload: { itineraries: _itineraries }
  };
}

export function fetchItinerariesError(_error) {
  return {
    type: FETCH_ITINERARIES_ERROR,
    payload: { error: _error }
  };
}

export function setCurrentCity(city) {
  console.log(city);
  return {
    type: SET_CURRENT_CITY,
    payload: { currentCity: city }
  };
}
