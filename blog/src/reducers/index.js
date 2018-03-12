import {combineReducers} from 'redux'
import {Category} from './categoriesReducer'
import {Posts} from './postReducer'
import {Comments} from './commentReducer'

export default combineReducers({Category, Posts, Comments})
