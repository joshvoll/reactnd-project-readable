import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCategories} from '../utils/api'
import {getAllCategories} from '../actions/categoriesActions'

class NavBar extends Component {

  componentDidMount() {
    getCategories().then(categories => this.props.dispatch(getAllCategories(categories)))
  }

  render() {

    return (<nav className="nav-extended">
      <div className="nav-wrapper red">
        <Link to='/' className="brand-logo">React Blog</Link>
        <ul className="right hide-on-med-and-down">
          {
            this.props.categories.map((category, index) => (<li key={index}>
              <Link to={`/${category.name}`}>{category.name}</Link>
            </li>))
          }
        </ul>
      </div>
      <div className="nav-content">
        <ul className="tabs tabs-transparent red hide-on-large-only">
          {
            this.props.categories.map((category, index) => (<li className="tab" key={index}>
              <Link to={`/${category.name}`}>{category.name}</Link>
            </li>))
          }
        </ul>
      </div>
    </nav>)
  }
}

const mapStateToProps = (state) => ({categories: state.Category.categories})

export default connect(mapStateToProps)(NavBar)
