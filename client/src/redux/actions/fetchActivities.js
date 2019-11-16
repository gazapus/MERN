import {fetchActivitiesPending, fetchActivitiesSuccess, fetchActivitiesError} from './activitiesAction';

function fetchActivities(idItinerary) {
    return dispatch => {
        fetch('http://localhost:5000/activitiesByItinerary/' + idItinerary)
        .then(res => res.json())
        .then(res => {
            if(res.error) {
              throw(res.error);
            }
            dispatch(fetchActivitiesSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchActivitiesError(error));
            console.log(error);
        })
    }
}

export default fetchActivities;