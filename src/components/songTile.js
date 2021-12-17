import React, { Component } from 'react';
import './songTileStyle.css';
class SongTile extends Component{
  constructor() {
    super();
    this.state = {}
  }
  render(){

    var link = 'id/'+this.props.song.id
    

    return(
      <div className="songTileContainer">
        <div className="imageContainer">
          <img className="songImage" src={this.props.song.album.images[1].url} />
        </div>
        <div className="songInfoContainer">
          <a href={'/id/'+this.props.song.id} className="title">{this.props.song.name}</a>
          <div className="artists">
            {this.props.song.artists.map(artist =>
              <span className="artist">{artist.name} </span>
            )}
          </div>
        </div>
        {this.props.seed?
          <span></span>
          :
          <div></div>
        }

      </div>
      )
    }
  }
  export default SongTile;
