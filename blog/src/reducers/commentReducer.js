const comments = {
  comments: []
}
export const Comments = (state = comments, action) => {
  switch (action.type) {
    case 'GET_COMMENTS_ACTION':
      return {
        ...state,
        comments: action.allComments
      }
    case 'ADD_COMMENT_ACTION':
      return {
        ...state,
        comments: state.comments.concat(action.comment)
      }
    case 'EDIT_COMMENT_ACTION':
      return {
        ...state,
        comments: state.comments.map((comment) => (
          comment.id === action.comment.id
          ? action.comment
          : comment))
      }
    case 'DELETE_COMMENT_ACTION':
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (action.id === comment.id) {
            comment.deleted = true
          }
          return comment
        })
      }
    case 'VOTE_COMMENT_ACTION':
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (action.id === comment.id) {
            comment.voteScore = action.vote
          }
          return comment
        })
      }
    default:
      return state
  }
}
