export const GET_ALL_POSTS_ACTION = 'GET_ALL_POSTS_ACTION'
export const GET_POST_ACTION = 'GET_POST_ACTION'
export const ADD_POST_ACTION = 'ADD_POST_ACTION'
export const EDIT_POST_ACTION = 'EDIT_POST_ACTION'
export const DELETE_POST_ACTION = 'DELETE_POST_ACTION'
export const VOTE_POST_ACTION = 'VOTE_POST_ACTION'
export const GET_POST_ACTION_API = 'GET_POST_ACTION_API'
export const UPDATE_COMMENT_COUNT = 'UPDATE_COMMENT_COUNT'

export const getAllPosts = (posts) => ({type: GET_ALL_POSTS_ACTION, posts: posts})

export const getPost = (id, category) => ({type: GET_POST_ACTION, id: id, category: category})

export const addPost = (post) => ({type: ADD_POST_ACTION, post: post})

export const editPost = (post) => ({type: EDIT_POST_ACTION, post: post})

export const deletePost = (post) => ({type: DELETE_POST_ACTION, id: post.id, category: post.category})

export const votePost = (post) => ({type: VOTE_POST_ACTION, id: post.id, vote: post.voteScore, category: post.category})

export const getPostApi = (post) => ({type: GET_POST_ACTION_API, post: post})

export const updateCommentCount = (postId, category, option) => ({type: UPDATE_COMMENT_COUNT, option: option, parentId: postId, category: category})
