import {
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_ERROR,
} from '../actions/activitiesAction';

const defaultState = {
  pending: true,
  activities: [],
  error: null
};

function activitiesReducer(state = defaultState, action) {
  switch (action.type) {
      case FETCH_ACTIVITIES_SUCCESS:
        /*activities[action.payload.idItinerary] = action.payload.activities*/
          return {
              ...state,
              pending: false,
              activities: action.payload.activities
          }
      case FETCH_ACTIVITIES_ERROR:
          return {
              ...state,
              pending: false,
              error: action.error
          }
      default:
          return state;
  }
}

export default activitiesReducer;