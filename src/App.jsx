import React from "react";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import Cookies from "js-cookie";
import "react-spotify-auth/dist/index.css";
import Home from "./components/home.jsx";
import "./App.css";

const App = () => {
  const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"));

  return (
    <div className="appContainer">
      {token ? (
        <Home token={token} />
      ) : (
        <div className="loginContainer">
          <div>
            <p>logging in required to use Recommendify</p>
          </div>
          <div>
            <SpotifyAuth
              redirectUri={window.location}
              clientID={import.meta.env.VITE_SPOTIFY_CLIENT_ID}
              scopes={[
                Scopes.userReadPrivate,
                "user-read-email",
                "user-top-read",
                "user-read-recently-played",
                "user-library-read",
              ]}
              onAccessToken={(token) => setToken(token)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
