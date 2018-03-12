const api = "http://localhost:3001"
// const api = "https://rmw-udacity-readable-server.herokuapp.com"

// Generate a unique token for storing info on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

  // Authorization header
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/* Api Functions */

// Fetch all Categories
export const getCategories = () => fetch(`${api}/categories`, {headers}).then(result => result.json()).then((data) => data.categories)

// Fetch all Posts
export const getAllPosts = () => fetch(`${api}/posts`, {headers}).then(result => result.json())

// Fetch Post
export const getPost = (id) => fetch(`${api}/posts/${id}`, {headers}).then(result => result.json())

// Add new Post
export const addPost = (post) => fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
}).then(result => result.json())

// Edit Post
export const editPost = (id, title, body) => fetch(`${api}/posts/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({title: title, body: body})
}).then(result => result.json())

// Vote Post
export const votePost = (id, option) => fetch(`${api}/posts/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option})
}).then(result => result.json())

// Delete the Post
export const deletePost = (id) => fetch(`${api}/posts/${id}`, {
  method: 'DELETE',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  }
}).then(result => result.json())

// Fetch all comments related to the given post
export const getComments = (id) => fetch(`${api}/posts/${id}/comments`, {headers}).then(result => result.json())

// Add new Comment
export const addComment = (comment) => fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(comment)
}).then(result => result.json())

// Edit Comment
export const editComment = (id, content) => fetch(`${api}/comments/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(content)
}).then(result => result.json())

// Delete comment
export const deleteComment = (id) => fetch(`${api}/comments/${id}`, {
  method: 'DELETE',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  }
}).then(result => result.json())

// Vote Comment
export const voteComment = (id, option) => fetch(`${api}/comments/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option})
}).then(result => result.json())
