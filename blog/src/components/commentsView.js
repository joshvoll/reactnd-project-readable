import React, {Component} from 'react'
import Comment from './comment'
import {getComments as requestComments} from '../utils/api'
import {getComments} from '../actions/commentActions'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import uuidv4 from 'uuid/v4'
import {addComment as addNewComment} from '../utils/api'
import {addComment} from '../actions/commentActions'
import {updateCommentCount} from '../actions/postActions'
import {withRouter} from 'react-router-dom'

class Comments extends Component {

  componentWillMount() {
    requestComments(this.props.id).then(comments => this.props.dispatch(getComments(comments)))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const val = serializeForm(e.target, {hash: true})
    val.id = uuidv4()
    val.timestamp = Date.now()
    val.parentId = this.props.id
    addNewComment(val).then(comment => this.props.dispatch(addComment(comment))).then(this.props.dispatch(updateCommentCount(this.props.id, this.props.match.params.category, "inc")))
    e.target.reset();
  }

  render() {
    const comments = this.props.comments
    return (<div className="card-action">
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="col s12">
              <input placeholder="Enter your Comments" id="comment_input" type="text" name="body" className="validate" required="required"/>
            </div>
            <div className="col s8 m10">
              <input placeholder="Comment Author" id="comment_input" type="text" className="validate" name="author" required="required"/>
            </div>
            <div className="col s4 m2">
              <button className="btn waves-effect waves-light right" type="submit" name="action">
                <i className="material-icons center">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
      {
        comments.filter((comment) => comment.deleted !== true).length > 0
          ? comments.map(comment => (<Comment key={comment.id} comment={comment} parentId={this.props.id}/>))
          : <h4>No Comments</h4>
      }
    </div>)
  }

}

const mapStateToProps = (state) => ({comments: state.Comments.comments})

export default withRouter(connect(mapStateToProps)(Comments));
