import { setCurrentCity } from "./itinerariesActions";

function fetchCurrentCity(idCity) {
  return dispatch => {
    fetch("http://localhost:5000/city/" + idCity)
      .then(res => res.json())
      .then(res => {
        dispatch(setCurrentCity(res));
        return res;
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export default fetchCurrentCity;
