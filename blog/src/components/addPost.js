import React, {Component} from 'react'
import HomeButton from './homeButton'
import serializeForm from 'form-serialize'
import {addPost as addNewPost, getPost as requestPost, editPost as editPostApi} from '../utils/api'
import {addPost, editPost} from '../actions/postActions'
import uuidv4 from 'uuid/v4'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class AddPost extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const val = serializeForm(e.target, {hash: true})
    if (this.props.editPost) {
      editPostApi(this.props.match.params.id, val.title, val.body).then(post => this.props.dispatch(editPost(post))).then(() => {
        this.props.history.push(`/${this.props.match.params.category}/${this.props.match.params.id}`)
      })
    } else {
      val.id = uuidv4()
      val.timestamp = Date.now()
      addNewPost(val).then(post => this.props.dispatch(addPost(post))).then(() => {
        this.props.history.push(`/${val.category}/${val.id}`)
      })
    }

  }

  state = {
    title: "",
    author: "",
    category: "0",
    body: ""
  }

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    switch (name) {
      case "title":
        this.setState({"title": value})
        break
      case !this.props.editPost && "category":
        this.setState({"category": value})
        break
      case !this.props.editPost && "author":
        this.setState({"author": value})
        break
      case "body":
        this.setState({"body": value})
        break
      default:
        return

    }
  }

  componentWillMount() {
    if (this.props.editPost) {
      const id = this.props.match.params.id
      requestPost(id).then(post => {
        this.setState({title: post.title, author: post.author, category: post.category, body: post.body})
      })
    }
  }

  render() {

    return (<div className="row">
      <form className="col s12 l8 offset-l2" id="post-form" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input id="post-title" type="text" name="title" className="validate" placeholder="Post Title" value={this.state.title} required="required" onChange={this.handleChange}/>
          </div>
        </div>

        <div>
          {
            !this.props.editPost && (<div className="row">
              <div className="input-field col s6">
                <input id="post-author" type="text" className="validate" name="author" placeholder="Post Author" value={this.state.author} required="required" onChange={this.handleChange}/>
              </div>
              <div className="col s6">
                <label>Category</label>
                <select className="browser-default" name="category" required="required" value={this.state.category} onChange={this.handleChange}>
                  <option value="0" disabled="disabled">Choose your option</option>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
                </select>
              </div>
            </div>)
          }
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea id="post-body" className="materialize-textarea" placeholder="Post-Content" name="body" required="required" value={this.state.body} onChange={this.handleChange}></textarea>
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit">Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
      <HomeButton/>
    </div>)
  }
}

const mapStateToProps = (state) => ({Posts: state.Posts.allPosts, Categories: state.Category.categories})

export default withRouter(connect(mapStateToProps)(AddPost));
