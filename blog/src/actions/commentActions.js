export const GET_COMMENTS_ACTION = 'GET_COMMENTS_ACTION'
export const ADD_COMMENT_ACTION = 'ADD_COMMENT_ACTION'
export const EDIT_COMMENT_ACTION = 'EDIT_COMMENT_ACTION'
export const DELETE_COMMENT_ACTION = 'DELETE_COMMENT_ACTION'
export const VOTE_COMMENT_ACTION = 'VOTE_COMMENT_ACTION'

export const getComments = (comments) => ({type: GET_COMMENTS_ACTION, allComments: comments})

export const addComment = (comment, category) => ({type: ADD_COMMENT_ACTION, comment: comment})

export const editComment = (comment) => ({type: EDIT_COMMENT_ACTION, comment: comment})

export const deleteComment = (comment) => ({type: DELETE_COMMENT_ACTION, id: comment.id})

export const voteComment = (comment) => ({type: VOTE_COMMENT_ACTION, id: comment.id, vote: comment.voteScore})
