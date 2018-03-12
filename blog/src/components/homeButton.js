import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class HomeButton extends Component {
  render() {
    return (<div className="fixed-action-btn">
      <Link className="btn-floating btn-large red waves-effect" to="/">
        <i className="large material-icons">home</i>
      </Link>
    </div>)
  }
}

export default HomeButton;
