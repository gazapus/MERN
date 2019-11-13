import {fetchItinerariesPending, fetchItinerariesSuccess, fetchItinerariesError, setCurrentCity} from './itinerariesActions';

function fetchItineraries(idCity) {
    return dispatch => {
        dispatch(fetchItinerariesPending());
        fetch('http://localhost:5000/itinerariesByCity/' + idCity.slice(1))
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchItinerariesSuccess(res));
            fetch('http://localhost:5000/city/' + idCity.slice(1))
            .then(res => res.json())
            .then(res => {
                dispatch(setCurrentCity(res));
            });
            return res;
        })
        .catch(error => {
            dispatch(fetchItinerariesError(error));
        })
    }
}

export default fetchItineraries;