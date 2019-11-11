import {fetchCitiesPending, fetchCitiesSuccess, fetchCitiesError} from './cityActions';

function fetchCities() {
    return dispatch => {
        dispatch(fetchCitiesPending());
        fetch('http://localhost:5000/getCities')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchCitiesSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchCitiesError(error));
        })
    }
}

export default fetchCities;