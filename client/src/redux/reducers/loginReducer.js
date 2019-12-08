const defaultState = {
  success: false,
  token: null,
  errorMessage: ''
};

function loginReducer(state = defaultState, action) {
  switch (action.type) {
    case 'USER_LOGIN_OK':
      console.log(action.payload.token);
      return {
        ...state,
        success: true,
        token: action.payload.token,
        errorMessage: ''
      };
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        success: false,
        errorMessage: action.payload.error,
        token: ''
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        success: false,
        token: ''
      };
    default:
      return state;
  }
}

export default loginReducer;
