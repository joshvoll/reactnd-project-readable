import {categories} from './categoriesReducer'
const posts = {
  allPosts: {
    'react': [],
    'redux': [],
    'udacity': []
  },

  currentPost: null
}
export const Posts = (state = posts, action) => {
  switch (action.type) {
    case 'GET_ALL_POSTS_ACTION':
      return {
        ...state,
        allPosts: categories.reduce((acc, cat) => {
          acc[cat.path] = action.posts.filter(post => post.category === cat.path)
          return acc
        }, {})
      }
    case 'ADD_POST_ACTION':
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          [action.post.category]: state.allPosts[action.post.category].concat(action.post)
        },
        currentPost: action.post
      }
    case 'EDIT_POST_ACTION':
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          [action.post.category]: state.allPosts[action.post.category].map(post => (
            post.id === action.post.id
            ? action.post
            : post))
        },
        currentPost: action.post
      }
    case 'DELETE_POST_ACTION':
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          [action.category]: state.allPosts[action.category].map(post => (
            (post.id === action.id)
            ? {
              ...post,
              deleted: true
            }
            : post))
        }
      }
    case 'VOTE_POST_ACTION':
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          [action.category]: state.allPosts[action.category].map(post => {
            if (post.id === action.id) {
              post.voteScore = action.vote
            }
            return post
          })
        },
        currentPost: {
          ...state.currentPost,
          voteScore: action.vote
        }
      }
    case 'GET_POST_ACTION':
      const post = state.allPosts[action.category].filter(post => (post.id === action.id))
      return {
        ...state,
        currentPost: post.length
          ? post[0]
          : null
      }
    case 'GET_POST_ACTION_API':
      return {
        ...state,
        currentPost: action.post
      }
    case 'UPDATE_COMMENT_COUNT':
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          [action.category]: state.allPosts[action.category].map(post => {
            if (post.id === action.parentId) {
              post.commentCount = action.option === "inc"
                ? post.commentCount + 1
                : post.commentCount - 1
            }
            return post
          })
        }
      }

    default:
      return state
  }
}
