import React, { Component } from 'react';
import './songTileStyle.css';
class SongTile extends Component{
  constructor() {
    super();
    this.state = {}
  }
  render(){
    
    return(
      <div className="songTileContainer">
        <div className="imageContainer">
          <img className="songImage" src={this.props.song.album.images[1].url} />
        </div>
        <div className="songInfoContainer">
          <span className="title">{this.props.song.name}</span>
          <div className="artists">
            {this.props.song.artists.map(artist =>
              <span className="artist">{artist.name} </span>
            )}
          </div>
        </div>

      </div>
      )
    }
  }
  export default SongTile;
