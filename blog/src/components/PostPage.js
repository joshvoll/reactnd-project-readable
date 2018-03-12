import React, {Component} from 'react'
import PostCard from './PostCard'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import HomeButton from './homeButton'
import {getPost, getPostApi} from '../actions/postActions'
import {getPost as requestPost} from '../utils/api'

class PostPage extends Component {

  componentDidMount() {
    if (this.props.Posts[this.props.match.params.category].length === 0) {
      requestPost(this.props.match.params.id).then(post => this.props.dispatch(getPostApi(post)))
    }
    this.props.dispatch(getPost(this.props.match.params.id, this.props.match.params.category))
  }

  render() {
    const post = this.props.Post;
    return (<div>
      {
        post && post.category === this.props.match.params.category
          ? <PostCard post={post} key={post.id} showComments={true}/>
          : <h2>Post don't exist</h2>
      }
      <HomeButton/>
    </div>)
  }
}
const mapStateToProps = (state) => ({Posts: state.Posts.allPosts, Post: state.Posts.currentPost})
export default withRouter(connect(mapStateToProps)(PostPage));
