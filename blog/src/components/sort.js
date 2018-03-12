import React, {Component} from 'react'

class SortSelect extends Component {

  handleSort = (e) => {
    const val = e.target.value
    this.props.sorting(val)
  }

  render() {
    return (<div className="row" id="sort-select">
      <div className="col s5 offset-s7 m4 offset-m8 l3 offset-l8">
        <select className="browser-default" defaultValue='0' onChange={this.handleSort}>
          <option value="0" disabled="disabled">Sort By...</option>
          <option value="1">Vote-Ascending</option>
          <option value="2">Vote-Descending</option>
        </select>
      </div>
    </div>)
  }
}

export default SortSelect;
