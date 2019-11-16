import {fetchItinerariesPending, fetchItinerariesSuccess, fetchItinerariesError} from './itinerariesActions';

function fetchItineraries(idCity) {
    return dispatch => {
        dispatch(fetchItinerariesPending());
        fetch('http://localhost:5000/itinerariesByCity/' + idCity)
        .then(res => res.json())
        .then(res => {
            if(res.error) {
              throw(res.error);
            }
            dispatch(fetchItinerariesSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchItinerariesError(error));
            console.log(error);
        })
    }
}

export default fetchItineraries;