export const FETCH_CITIES_PENDING = 'FETCH_CITIES_PENDING';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR';

export function fetchCitiesPending() {
  return {
      type: FETCH_CITIES_PENDING,
  }
}

export function fetchCitiesSuccess(_cities) {
  return {
      type: FETCH_CITIES_SUCCESS,
      payload: {cities: _cities}
  }
}

export function fetchCitiesError(_error) {
  return {
      type: FETCH_CITIES_ERROR,
      payload: {error: _error}
  }
}