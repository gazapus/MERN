import { FETCH_USER } from '../actions/loginAction.js';

const defaultState = {
     succes: false,
     token: null
};

function loginReducer(state = defaultState, action) {
     switch (action.type) {
          case FETCH_USER:
               return {
                    ...state,
                    success: true,
                    token: action.payload.token
               }
          default:
               return state;
     }
}

export default loginReducer;