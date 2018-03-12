import React, {Component} from 'react'
import AddPostButton from './addPostButton'
import {connect} from 'react-redux'
import PostCard from './PostCard'
import SortSelect from './sort'

class CategoryPage extends Component {

  state = {
    sortBy: "1"
  }

  sortPosts = (a, b) => {
    return this.state.sortBy === "1"
      ? a > b
      : a < b
  }

  handleSort = (val) => {
    switch (val) {
      case "2":
        this.setState({sortBy: "2"})
        break
      default:
        this.setState({sortBy: "1"})
    }
  }

  render() {
    const Posts = this.props.Posts[this.props.match.params.category];
    return (<div>
      <SortSelect sorting={this.handleSort}/> {
        Posts.filter((post) => post.deleted !== true).length > 0
          ? Posts.filter((post) => post.deleted !== true).sort((a, b) => this.sortPosts(a.voteScore, b.voteScore)).map(post => (<PostCard post={post} key={post.id}/>))
          : <h2>sorry no post available under this category! Please add new Post using Add Button.</h2>
      }
      <AddPostButton/>

    </div>)
  }
}

const mapStateToProps = (state) => ({Posts: state.Posts.allPosts, Categories: state.Category.categories})
export default connect(mapStateToProps)(CategoryPage)
