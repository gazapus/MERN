const defaultState = {
  success: false,
  errorMessage: ''
};

function registerReducer(state = defaultState, action) {
  switch (action.type) {
    case 'REGISTER_SUCCEFUL':
      return {
        ...state,
        success: true,
        errorMessage: ''
      };
    case 'REGISTER_ERROR':
      console.log(action.payload);
      return {
        ...state,
        success: false,
        errorMessage: action.payload.errorMessage
      };
    case 'FINISH_REGISTER':
      return {
        ...state,
        success: false,
        errorMessage: ''
      };
    default:
      return state;
  }
}

export default registerReducer;
