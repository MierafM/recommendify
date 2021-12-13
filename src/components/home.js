import React, { Component } from 'react';
import Header from './header';
import SongTile from './songTile';
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
    console.log(this.props.token)
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

    console.log('done fetching', this.state)

  }

  render(){
    console.log("prop", this.state)
    return(
      <div className="homeContainer">
        <Header/>
        <div>
        {this.state.userName ?
          <p>Welcome {this.state.userName}!</p>
          :
          <p>Loading ...</p>
        }
        </div>

        <div>
          {this.state.topTracks ?
            <div>
              <div className="sectionHeading">
                <span>top tracks</span>
                <button>more</button>

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
                <span>recently played</span>
                <button>more</button>
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
                <span>saved tracks</span>
                <button>more</button>
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
