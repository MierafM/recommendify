import React from 'react';
import  { Component } from 'react';
import './headerStyle.css';

class Header extends Component{
  constructor() {
    super();
    this.state = {}
  }
  render(){
    return(
      <div className="headerContainer">
        <span>Recommendify</span>
        <div className="headerSearch">
          <input type="text"/>
          <button>Search</button>
        </div>
      </div>
    )}}

export default Header;
