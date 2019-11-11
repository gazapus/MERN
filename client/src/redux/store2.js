import {createStore} from 'redux';
import holaMundoReducer from './reducers/holaMundoReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(holaMundoReducer, devToolsEnhancer());

export default store;