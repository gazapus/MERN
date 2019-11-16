export const FETCH_ACTIVITIES_SUCCESS = 'FETCH_ACTIVITIES_SUCCESS';
export const FETCH_ACTIVITIES_ERROR = 'FETCH_ACTIVITIES_ERROR';

export function fetchActivitiesSuccess(_activities) {
  return {
      type: FETCH_ACTIVITIES_SUCCESS,
      payload: {activities: _activities}
  }
}

export function fetchActivitiesError(_error) {
  return {
      type: FETCH_ACTIVITIES_ERROR,
      payload: {error: _error}
  }
}
