import React, { Component } from 'react';
import Header from './header';
import SongTile from './songTile';
import UsersTracks from './usersTracks';
import Footer from './footer';
import './homeStyle.css';

class Home extends Component{
  constructor() {
    super();
    this.state = {}

  }
  componentDidMount() {
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + this.props.token}
    }).then(response => response.json()).then(data =>
      this.setState({
        userName: data.display_name
      })
    )
    
    fetch('https://api.spotify.com/v1/me/top/tracks?'+'limit='+6,   {
      headers: {'Authorization': 'Bearer ' + this.props.token}
    }).then(response => response.json()).then(data =>
      this.setState({
        topTracks: data.items
      })
    )
    fetch('https://api.spotify.com/v1/me/player/recently-played?'+'limit='+6, {
      headers: {'Authorization': 'Bearer ' + this.props.token}
    }).then(response => response.json()).then(data =>
      this.setState({
        recentlyPlayedTracks: data.items
      })
    )
    fetch('https://api.spotify.com/v1/me/tracks?'+'limit='+6, {
      headers: {'Authorization': 'Bearer ' + this.props.token}
    }).then(response => response.json()).then(data =>
      this.setState({
        savedTracks: data.items
      }))



  }

  render(){

    return(
      <div className="homeContainer">
        <Header/>

        <div className="welcomeBox">
        {this.state.userName ?
          <span className="greeting">Welcome {this.state.userName}</span>
          :
          <p>Loading ...</p>
        }
        </div>

        <div className="usersTracks">
          {this.state.topTracks ?
            <div>
              <div className="sectionHeading">
                <span>Your Top Tracks</span>
                <a className="moreBtn" href='top-tracks'>more</a>
              </div>
              <hr/>
              <div className="tracksContainer">
                {this.state.topTracks.map(song =>
                <SongTile song={song}/>
                )}
              </div>
            </div>
            :
            <span> loading your top tracks </span>
          }
          {this.state.recentlyPlayedTracks ?
            <div>
              <div className="sectionHeading">
                <span>Your Recently Played</span>
                <a className="moreBtn" href='recently-played'>more</a>

              </div>
              <hr/>
              <div className="tracksContainer">
                {this.state.recentlyPlayedTracks.map(song =>
                <SongTile song={song.track}/>
                )}
              </div>
            </div>
            :
            <span> loading your recently played tracks </span>
          }
          {this.state.savedTracks ?
            <div>
              <div className="sectionHeading">
                <span>Your Saved Tracks</span>
                <a className="moreBtn" href='saved-tracks'>more</a>

              </div>
              <hr/>
              <div className="tracksContainer">
                {this.state.savedTracks.map(song =>
                <SongTile song={song.track}/>
                )}
              </div>
            </div>
            :
            <span> loading your saved tracks </span>

          }


        </div>
        <Footer/>

      </div>
    )}}

export default Home;
