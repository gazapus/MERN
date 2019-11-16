import {createStore, applyMiddleware, combineReducers } from 'redux';
import citiesReducer from './reducers/cityReducer';
import itinerariesReducer from './reducers/itinerariesReducers';
import activitiesReducer from './reducers/activitiesReducer';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const reducers = combineReducers({citiesReducer, itinerariesReducer, activitiesReducer});
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(...middlewares)));

export default store;