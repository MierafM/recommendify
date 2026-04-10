import React, { Component } from "react";
import "./headerStyle.css";

class Header extends Component {
  render() {
    return (
      <div className="headerContainer">
        <a href="/">
          <span className="appName">Recommendify</span>
        </a>
        <div className="headerSearch">
          <input className="inputBox" type="text" />
          <button className="inputBtn">Search</button>
        </div>
      </div>
    );
  }
}

export default Header;
