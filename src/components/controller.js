import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route,Link, useParams} from "react-router-dom";
import App from '../App';
import Home from './home';
import UsersTracks from './usersTracks';

export default function Controller(props){
  console.log('controller props', props)
  return(
    <Router >
      <Switch>
        <Route path='/top-tracks'>  <UsersTracks type="top" /> </Route>
        <Route path='/recently-played'>  <UsersTracks type="recently played" /> </Route>
        <Route path='/saved-tracks'>  <UsersTracks type="saved" /> </Route>
        <Route path='/'>  <App /> </Route>
      </Switch>
    </Router>
  );
}
