import {createStore, applyMiddleware } from 'redux';
import citiesReducer from './reducers/cityReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const store = createStore(citiesReducer, composeWithDevTools(
    applyMiddleware(...middlewares)));

export default store;