const defaultState = {
  comments: [],
  error: null,
  commentAdded: false
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
    case 'COMMENT_ADDED':
      let newComments = [action.payload.newComment].concat(state.comments);
      return {
        ...state,
        commentAdded: true,
        comments: newComments
      };
    case 'CLEAR_COMMENT_LOADED':
      return {
        ...state,
        commentAdded: false
      };
    default:
      return state;
  }
}

export default commentsReducer;
