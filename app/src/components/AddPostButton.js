import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// just adding the post button with the router functionality
class AddPostButton extends Component {
  render() {
    return (<div className="fixed-action-btn">
      <Link className="btn-floating btn-large blue waves-effect" to='/post/new'>
        <i className="large material-icons">add</i>
      </Link>
    </div>)
  }
}

export default AddPostButton;
