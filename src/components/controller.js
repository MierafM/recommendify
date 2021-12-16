import React, { useState } from 'react';
import { BrowserRouter, Router, Routes, Route} from "react-router-dom";
import App from '../App';
import Home from './home';
import UsersTracks from './usersTracks';

export default function Controller(props){
  console.log('controller props', props)
  return(
    <BrowserRouter >
      <Routes>
        <Route path='/top-tracks'  element={<UsersTracks type="top" /> }/>
        <Route path='/recently-played' element={<UsersTracks type="recently played" />}/>
        <Route path='/saved-tracks' element={<UsersTracks type="saved" />} />
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
