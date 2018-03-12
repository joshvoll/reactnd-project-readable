import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class AddPostButton extends Component {
  render() {
    return (<div className="fixed-action-btn">
      <Link className="btn-floating btn-large red waves-effect" to='/post/new'>
        <i className="large material-icons">add</i>
      </Link>
    </div>)
  }
}

export default AddPostButton;
