import React, { Component } from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { SpotifyApiContext } from 'react-spotify-api';
import Header from './header';
import SongTile from './songTile';
import Footer from './footer';
import Cookies from 'js-cookie';
import './userTracksStyle.css';
class UsersTracks extends Component{

  constructor() {
    super();
    this.state = {}


  }
  componentDidMount() {
    const token = Cookies.get("spotifyAuthToken");
    console.log('mounted: using token', token);
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json()).then(data =>
      this.setState({
        userName: data.display_name
      })
    )
    if (this.props.type == "top"){
      fetch('https://api.spotify.com/v1/me/top/tracks?' , {
        headers: {'Authorization': 'Bearer ' + token}
      }).then(response => response.json()).then(data =>
        this.setState({
          tracks: data.items
        })
      )
    } else if (this.props.type == "recently played"){
      fetch('https://api.spotify.com/v1/me/player/recently-played?', {
        headers: {'Authorization': 'Bearer ' + token}
      }).then(response => response.json()).then(data =>
        this.setState({
          tracks: data.items
        })
      )

    }else if (this.props.type == "saved"){
      fetch('https://api.spotify.com/v1/me/tracks?', {
        headers: {'Authorization': 'Bearer ' + token}
      }).then(response => response.json()).then(data =>
        this.setState({
          tracks: data.items
        }))
    }

  }
  render(){
    console.log("users tracks prop", this.props, 'state', this.state)

    return(
      <div className="userTracksContainer">
        <Header/>
        <div>
          <div className="sectionHeading">
            {this.state.userName ?
              <span>{this.state.userName}'s {this.props.type} tracks</span>
              :
              <span>Your {this.props.type} tracks</span>
            }
          </div>
          <hr/>
          <div className="sectionBody">
            {this.state.tracks&&(this.props.type == "top") ?
              <div className="songsContainer">
                {this.state.tracks.map(song =>
                <SongTile song={song}/>
                )}
              </div>
            : this.state.tracks&&(this.props.type == "recently played") ?
              <div className="songsContainer">
                {this.state.tracks.map(song =>
                <SongTile song={song.track}/>
                )}
              </div>
            :this.state.tracks&&(this.props.type == "saved") ?
              <div className="songsContainer">
                {this.state.tracks.map(song =>
                <SongTile song={song.track}/>
                )}
              </div>
            :
            <span>Something went wrong, go back to the home page and try again</span>
          }


          </div>
        </div>
        <Footer/>
      </div>
    )
  }
  }
  export default UsersTracks;
