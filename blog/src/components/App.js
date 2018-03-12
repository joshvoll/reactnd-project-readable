import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import NavBar from './navBar'
import AddPost from './addPost'
import MainPage from './MainPage'
import CategoryPage from './CategoryPage'
import PostPage from './PostPage'
import {withRouter, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllPosts as requestPosts} from '../utils/api'
import {getAllPosts} from '../actions/postActions'

class App extends Component {

  componentDidMount() {
    requestPosts().then(posts => this.props.dispatch(getAllPosts(posts)))
  }

  render() {
    return (<div className="app">
      <NavBar/>
      <div className="container">
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route exact path='/:category' component={CategoryPage}/>
          <Route exact path='/post/new' component={AddPost}/>
          <Route exact path='/:category/:id' component={PostPage}/>
          <Route exact path='/:category/:id/edit' render={()=>(
              <AddPost editPost={true}/>
            )}/>
          <Route render ={() => (
              <h1>Page not Found!</h1>
            )}/>
        </Switch>
      </div>
    </div>)
  }
}
const mapStateToProps = (state) => ({Posts: state.Posts.allPosts, Categories: state.Category.categories})

export default withRouter(connect(mapStateToProps)(App))
