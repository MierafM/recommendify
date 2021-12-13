import React, { Component } from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css'
import Home from './components/home.js';
import logo from './logo.svg';
import './App.css';

const App = () => {
    const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"));

    return (
      <div className="appContainer">
      {token ? (
        <Home token={token}/>
      ) :(
        <div className="loginContainer">
          <div>
            <p>not logged in. log in for recommendations</p>
          </div>
          <div>
            <SpotifyAuth
              //{/* t change css set btnClassName to something else*/}
              redirectUri='http://localhost:3000/callback'
              clientID='5d25f8f76d5a41ff9f4e6414f25a47a5'
              scopes={[Scopes.userReadPrivate, 'user-read-email', 'user-top-read', 'user-read-recently-played', 'user-library-read']} // either style will work
              onAccessToken={(token) => setToken(token)}

            />
          </div>
        </div>
      )}

      </div>
    )
  }


export default App;
