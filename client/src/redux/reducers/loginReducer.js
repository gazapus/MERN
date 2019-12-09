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
      console.log(action.payload.token);
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
    case 'USER_LOGOUT_OK':
      return {
        ...state,
        success: false,
        token: '',
        avatarURL: '',
        username: ''
      };
    case 'USER_LOGOUT_ERROR':
      alert("Error to logout");
      return {
        ...state,
        }
    default:
      return state;
  }
}

export default loginReducer;
