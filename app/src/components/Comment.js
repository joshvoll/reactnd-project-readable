import React, {Component} from 'react'
import TimeStamp from 'react-timestamp'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {deleteComment as removeComment, voteComment as rateComment, editComment as updateCommentApi} from '../utils/api'
import {deleteComment, voteComment, editComment} from '../actions/commentActions'
import {updateCommentCount} from '../actions/postActions'

class Comment extends Component {

  deleteComment = (id) => {
    removeComment(id).then(comment => this.props.dispatch(deleteComment(comment))).then(this.props.dispatch(updateCommentCount(this.props.parentId, this.props.match.params.category, "dec")))
  }

  voteComment = (id, vote) => {
    rateComment(id, vote).then(comment => this.props.dispatch(voteComment(comment)))
  }

  state = {
    editing: false
  }

  updateComment = (e) => {
    e.preventDefault()
    const val = serializeForm(e.target, {hash: true})
    val.timestamp = Date.now()
    updateCommentApi(this.props.comment.id, val).then(comment => this.props.dispatch(editComment(comment))).then(() => {
      this.setState({editing: false})
    })

  }

  editComment = () => {
    this.setState({editing: true})
  }
  cancelEditing = () => {
    this.setState({editing: false})
  }

  render() {
    const comment = this.props.comment;
    const editing = this.state.editing;
    return (<div>
      {
        comment.deleted === false && (<div className="row">
          <div className="col s2 m1 postcard-votes">
            <button className="btn-flat medium vote-button" onClick={() => this.voteComment(comment.id, "upVote")}>
              <i className="material-icons">expand_less</i>
            </button>
            <span className="comment-vote">{comment.voteScore}</span>
            <button className="btn-flat medium vote-button" onClick={() => this.voteComment(comment.id, "downVote")}>
              <i className="material-icons">expand_more</i>
            </button>
          </div>
          <div className="col s10 m11">
            {
              editing
                ? <form onSubmit={this.updateComment}>
                    <div className="row">
                      <div className="col s8 m10">
                        <input placeholder="Enter your Comments" id="comment_input" type="text" name="body" className="validate" required="required" defaultValue={comment.body}/>
                      </div>
                      <div className="col s4 m2">
                        <button className="btn waves-effect waves-light right" type="submit" name="action">
                          <i className="material-icons center">send</i>
                        </button>
                      </div>
                    </div>
                  </form>
                : <h5 id="comment-body">{comment.body}</h5>
            }
            <div>
              <span id="comment-author">{comment.author} </span>
              posted on
              <span id="comment-date"><TimeStamp time={comment.time} format='date'/></span>
              <div className="comment-edit right">
                {
                  editing && (<button className="cancel-button" onClick={this.cancelEditing}>
                    <i className="material-icons grey-text text-darken-2">clear</i>
                  </button>)
                }
                <button className="edit-button" onClick={this.editComment}>
                  <i className="material-icons grey-text text-darken-2">edit</i>
                </button>
                <button className="delete-button" onClick={()=>this.deleteComment(comment.id)}>
                  <i className="material-icons grey-text text-darken-2">delete_sweep</i>
                </button>
              </div>

            </div>
          </div>
        </div>)
      }
    </div>)
  }
}

const mapStateToProps = (state) => ({comments: state.Comments.comments})
export default withRouter(connect(mapStateToProps)(Comment));
