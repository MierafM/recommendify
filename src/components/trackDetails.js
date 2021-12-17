import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import SongTile from './songTile';
import Cookies from 'js-cookie';
import './trackDetailsStyle.css';



class TrackDetails extends Component{

  constructor() {
    super();
    this.state = {}
    this.handlecalcScore = this.handlecalcScore.bind(this);

  }

  componentDidMount() {
    const token = Cookies.get("spotifyAuthToken");
    console.log('token ', token);
    let trackID = window.location.pathname.split('/')[2]
    console.log('curr trackID',trackID);
    fetch('https://api.spotify.com/v1/tracks/'+trackID, {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json()).then(data =>
      this.setState({
        track:data
      })
    )
    fetch('https://api.spotify.com/v1/audio-features/'+trackID, {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json()).then(data =>
      fetch('https://api.spotify.com/v1/recommendations?seed_tracks='+data.id+
      '&limit=100'
      +'&target_acousticness='+data.acousticness
      +'&min_acousticness='+(data.acousticness-0.2)
      +'&max_acousticness='+(data.acousticness+0.2)
      +'&target_danceability='+data.danceability
      +'&min_danceability='+(data.danceability-0.2)
      +'&max_danceability='+(data.danceability+0.2)
      +'&target_energy='+data.energy
      +'&min_energy='+(data.energy-0.2)
      +'&max_energy='+(data.energy+0.2)
      +'&target_instrumentalness='+data.instrumentalness
      +'&min_instrumentalness='+(data.instrumentalnes-0.2)
      +'&max_instrumentalness='+(data.instrumentalness+0.2)
      +'&target_key='+data.key
      +'&target_loudness='+data.loudness
      +'&target_mode='+data.mode
      +'&target_speechiness='+data.speechiness
      +'&min_speechiness='+(data.speechiness-0.2)
      +'&max_speechiness='+(data.speechiness+0.2)
      +'&target_tempo='+data.tempo
      +'&min_tempo='+(data.tempo-20)
      +'&max_tempo='+(data.tempo+20)
      +'&target_valence='+data.valence
      +'&min_valence='+(data.valence-0.2)
      +'&max_valence='+(data.valence+0.2)
      , {
          headers: {'Authorization': 'Bearer ' + token}
      }).then(response => response.json()).then(data2 =>
        this.setState({
          recommendations:data2})).then(this.setState({
            features:data
          })))
  }
  handlecalcScore(event){
    /*
    this.state.recommendations.tracks.map(track =>

    )
    */
  }

  render(){
    console.log('this', this.state);
    this.handlecalcScore()
    return(
        <div className="trackDetailsContainer">
        <Header/>
        {this.state.track && this.state.features?
          <div className="aboutTrack">
            <div className="trackInfo">
              <img  className="trackIMG"src={this.state.track.album.images[1].url} />
              <span className="trackName">{this.state.track.name}</span>
              {this.state.track.artists.map(artist =>
                <span className="trackArtists" >{artist.name} </span>
              )}
            </div>

            <div className="trackDetails">
              <span className="featuresTitle">{this.state.track.name}'s Features </span>
              <div className="allFeatures">
                <span className="trackFeatures">acousticness: {this.state.features.acousticness}</span>
                <span className="trackFeatures">danceability: {this.state.features.danceability}</span>
                <span className="trackFeatures">energy: {this.state.features.energy}</span>
                <span className="trackFeatures">key: {this.state.features.key}</span>
                <span className="trackFeatures">tempo: {this.state.features.tempo}</span>
                <span className="trackFeatures">valence: {this.state.features.valence}</span>
              </div>
            </div>



          </div>
          :
          <span>Loading track info...</span>
        }
        <div className="recommendationSection">
          <span className="recHeader">Recommendations</span>
          {this.state.recommendations ?
            <div className="recommendedTiles">
              {this.state.recommendations.tracks.map(song =>
              <SongTile song={song} seed={this.state.features}/>
              )}
            </div>
            :
            <span>Loading recommendations ... </span>
          }
        </div>




        <Footer/>
        </div>

    )
  }
}
export default TrackDetails;
