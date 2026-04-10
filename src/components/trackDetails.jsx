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


  }

  async componentDidMount() {

    const token = Cookies.get("spotifyAuthToken");
    //console.log('token ', token);
    let trackID = window.location.pathname.split('/')[2]
    //console.log('curr trackID',trackID);

    const track = await fetch('https://api.spotify.com/v1/tracks/'+trackID, {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
    this.setState({
      track: track
    })

    const features = await fetch('https://api.spotify.com/v1/audio-features/'+trackID, {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
    this.setState({
      features: features
    })

    const recs = await fetch('https://api.spotify.com/v1/recommendations?seed_tracks='+this.state.track.id+'&limit=100'
      //mood (Danceability, Valence, Energy, Tempo): most important aspect: provide max and min
      +'&target_danceability='+features.danceability
      +'&min_danceability='+(features.danceability-0.2)
      +'&max_danceability='+(features.danceability+0.2)

      +'&target_valence='+features.valence
      +'&min_valence='+(features.valence-0.2)
      +'&max_valence='+(features.valence+0.2)

      +'&target_energy='+features.energy
      +'&min_energy='+(features.energy-0.2)
      +'&max_energy='+(features.energy+0.2)

      +'&target_tempo='+features.tempo
      +'&min_tempo='+(features.tempo-10)
      +'&max_tempo='+(features.tempo+10)

      //properties (Loudness, Speechiness, Instrumentalness) and context (Liveness, Acousticness) : secondary, just provide target
      +'&target_loudness='+features.loudness
      +'&target_speechiness='+features.speechiness
      +'&target_instrumentalness='+features.instrumentalness

      +'&target_acousticness='+features.acousticness
      +'&target_liveness='+features.liveness
      //segements: to be added in the future after research
      , {
          headers: {'Authorization': 'Bearer ' + token}
      }).then(response => response.json())
      this.setState({
        recommendations: recs.tracks
      })
    console.log(this.state);
    let count = 0
    let errors = []
    for (let song of this.state.recommendations){

      const songDetail = await fetch('https://api.spotify.com/v1/audio-features/'+song.id, {
        headers: {'Authorization': 'Bearer ' + token}
      }).then(response => response.json())
      let diff = 0
      diff += Math.abs(this.state.features.danceability-songDetail.danceability)/Math.abs(this.state.features.danceability)

      diff += Math.abs(this.state.features.energy-songDetail.energy)/Math.abs(this.state.features.energy)
      //instrumentalness not working

      diff += Math.abs(this.state.features.liveness-songDetail.liveness)/Math.abs(this.state.features.liveness)
      diff += Math.abs(this.state.features.loudness-songDetail.loudness)/Math.abs(this.state.features.loudness)

      diff += Math.abs(this.state.features.speechiness-songDetail.speechiness)/Math.abs(this.state.features.speechiness)

      diff += Math.abs(this.state.features.tempo-songDetail.tempo)/Math.abs(this.state.features.tempo)

      diff += Math.abs(this.state.features.valence-songDetail.valence)/Math.abs(this.state.features.valence)
      console.log('song: ', song, 'detail', songDetail, 'diff', diff)

      errors.push(diff)



    }
    console.log(errors);
    this.setState({
      errors: errors
    })

  }
  handlecalcScore(event){
    /*
    this.state.recommendations.tracks.map(track =>

    )
    */
  }

  render(){
    const token = Cookies.get("spotifyAuthToken");
    //console.log('this', this.state);
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
          {this.state.recommendations && this.state.errors ?
            <div className="recommendedTiles">
              {this.state.recommendations.map((song, index) =>
                <SongTile song={song} error={this.state.errors[index]} />
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
