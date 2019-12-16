const defaultState = {
  success: false,
  token: null,
  errorMessage: '',
  avatarURL: '',
  username: ''
};

function loginReducer(state = defaultState, action) {
  switch (action.type) {
    case 'USER_LOGIN_OK':
      return {
        ...state,
        success: true,
        token: action.payload.token,
        avatarURL: action.payload.avatarURL,
        username: action.payload.username,
        errorMessage: ''
      };
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        success: false,
        errorMessage: action.payload.error,
        token: '',
        avatarURL: '',
        username: ''
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        success: false,
        token: '',
        avatarURL: '',
        username: ''
      };
    case 'FINISH_LOGIN':
      return {
        ...state,
        errorMessage: ''
      };
    default:
      return state;
  }
}

export default loginReducer;
