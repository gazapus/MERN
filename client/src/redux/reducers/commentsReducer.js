const defaultState = {
  comments: [],
  error: null
};

function commentsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_COMMENTS':
      return {
        ...state,
        comments: action.payload.comments,
        error: null
      };
    case 'CANT_LOAD_COMMENTS':
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export default commentsReducer;
