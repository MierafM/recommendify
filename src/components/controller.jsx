import React, { useState } from 'react';
import { BrowserRouter, Router, Routes, Route} from "react-router-dom";
import App from '../App';
import Home from './home';
import UsersTracks from './usersTracks';
import TrackDetails from './trackDetails';

export default function Controller(props){
  
  return(
    <BrowserRouter >
      <Routes>
        <Route path='/id/:id' element={<TrackDetails />} />
        <Route path='/top-tracks'  element={<UsersTracks type="top" /> }/>
        <Route path='/recently-played' element={<UsersTracks type="recently played" />}/>
        <Route path='/saved-tracks' element={<UsersTracks type="saved" />} />
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
