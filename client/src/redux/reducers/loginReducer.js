const defaultState = {
  success: false,
  token: null,
  errorMessage: '',
  avatarURL: '',
  username: '',
  id: ''
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
        id: action.payload.id,
        errorMessage: ''
      };
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        success: false,
        errorMessage: action.payload.error,
        token: '',
        avatarURL: '',
        username: '',
        id: ''
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        success: false,
        token: '',
        avatarURL: '',
        username: '',
        id: ''
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
