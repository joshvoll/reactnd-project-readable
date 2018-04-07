export const categories = [
  {
    name: 'react',
    path: 'react'
  }, {
    name: 'redux',
    path: 'redux'
  }, {
    name: 'udacity',
    path: 'udacity'
  }
]

export const Category = (state = {
  categories
}, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_ACTION':
      return {
        ...state,
        categories: action.categories
      }

    default:
      return state
  }
}
