import React, {Component} from 'react'
import Comments from './commentsView'
import {withRouter, Link} from 'react-router-dom'
import {deletePost, votePost} from '../actions/postActions'
import {deletePost as removePost, votePost as ratePost} from '../utils/api'
import {connect} from 'react-redux'

class PostCard extends Component {

  deletePost = (id) => {
    if (this.props.showComments) {
      removePost(id).then(post => this.props.dispatch(deletePost(post))).then(() => {
        this.props.history.push(`/`)
      })
    } else {
      removePost(id).then(post => this.props.dispatch(deletePost(post)))
    }
  }

  votePost = (id, option) => {
    ratePost(id, option).then(post => this.props.dispatch(votePost(post)))
  }

  render() {
    const post = this.props.post;
    return (<div>
      {
        post.hasOwnProperty("error") || post.deleted === true || Object.keys(post).length === 0
          ? <h2>Sorry, this post has been deleted</h2>
          : <div className="row postcard">
              <div className="col s12 m12 l10 offset-l1">
                <div className="card">
                  <div className="card-content">
                    <h5 className="postcard-title">
                      <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                    </h5>
                    <Link to={`/${post.category}`}>
                      <span className="badge blue white-text">{post.category}</span>
                    </Link>
                    <div className="chip postcard-author">
                      <img src="/images/yuna.jpg" alt="Contact Person"/> {post.author}
                    </div>
                    <div className="row">

                      <div className="col s2 m1 postcard-votes">
                        <button className="btn-flat medium vote-button" onClick={() => this.votePost(post.id, "upVote")}>
                          <i className="material-icons">expand_less</i>
                        </button>
                        <span className="vote-score-count">{post.voteScore}</span>
                        <button className="btn-flat medium vote-button" onClick={() => this.votePost(post.id, "downVote")}>
                          <i className="material-icons">expand_more</i>
                        </button>
                      </div>
                      <div className="col s10 m11">
                        <p>{post.body}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-action">
                    {
                      this.props.showComments
                        ? <Link to={`/${post.category}/${post.id}`}>{this.props.comments.length}</Link>
                        : <Link to={`/${post.category}/${post.id}`}>{post.commentCount}</Link>
                    }
                    <button className="delete-button" onClick={()=>this.deletePost(post.id)}>
                      <i className="material-icons small right postcard-edit black-text">delete</i>
                    </button>
                    <Link to={`/${post.category}/${post.id}/edit`}>
                      <i className="material-icons small right postcard-edit black-text">edit</i>
                    </Link>
                  </div>
                  {this.props.showComments && (<Comments id={post.id}/>)}
                </div>
              </div>
            </div>
      }
    </div>)
  }
}

const mapStateToProps = (state) => ({
  Posts: state.Posts.allPosts,
  Categories: state.Category.categories,
  comments: state.Comments.comments.filter(comment => comment.deleted === false)
})

export default withRouter(connect(mapStateToProps)(PostCard));
