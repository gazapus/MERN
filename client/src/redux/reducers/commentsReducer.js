const defaultState = {
  comments: [],
  error: null,
  commentAdded: false,
  commentEdited: false
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
    case 'EDIT_COMMENT':
      let updatedComments = state.comments;
      console.log(action.payload.editedComment._id );

      for(let comment of updatedComments){
        console.log(comment);
        if(comment._id === action.payload.editedComment._id ){
          comment.text = action.payload.editedComment.text;
        }
      }
      return{
        ...state,
        comments: updatedComments,
        commentEdited: true
      };
    case 'CLEAR_COMMENT_EDITED':
      return {
        ...state,
        commentEdited: false
      };
    case 'COMMENT_DELETED':
      let leftComments = [];
      console.log(action.payload.deleted);
      for(let i=0; i<state.comments.length; i++){
        if(action.payload.deleted._id !== state.comments[i]._id){
          leftComments.push(state.comments[i]);
        }
      }
      console.log(leftComments)
      return {
        ...state,
        comments: leftComments
      }
    default:
      return state;
  }
}

export default commentsReducer;
