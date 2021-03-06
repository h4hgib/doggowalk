import React from "react"
import {Link} from "react-router"
import {Component} from "./component"

export default class Menu extends Component {
  render() {
    return (
      <nav className={"navbar-collapse navbar-page-header navbar-right effect brackets collapse" + (this.props.menuCollapse ? "in" : "")}>
        <ul className="nav navbar-nav">
          <li><Link to="about">About</Link></li>
          <li><Link to="dog-index">Doggos</Link></li>
          <li><Link to="book">Book the Activity</Link></li>
          <li><Link to="credits">Credits</Link></li>
        </ul>
      </nav>
    )
  }
}
