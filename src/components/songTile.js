import React, { Component } from 'react';
import './songTileStyle.css';

class SongTile extends Component{
  state = {
    play: false,
    preview: new Audio(this.props.song.preview_url)
  }

  togglePlay = () => {

  this.setState({ play: !this.state.play },
    () => {
    this.state.play ? this.state.preview.play() : this.state.preview.pause();
    });
}
  componentDidMount(){

    //console.log('this.props', this.props);




  }


  render(){
    console.log('props', this.props.song.preview_url);
    console.log(this.state);
    var link = 'id/'+this.props.song.id

    return(
      <div className="songTileContainer">
        <div className="imageContainer">
          <img className="songImage" src={this.props.song.album.images[1].url} onClick={this.togglePlay}/>
        </div>
        {this.props.song.preview_url ?
          <div className="hp_slide">
            <div className="hp_range"></div>
          </div>
          :
          <div></div>
        }

        <div className="songInfoContainer">
          <a href={'/id/'+this.props.song.id} className="title">{this.props.song.name}</a>
          <div className="artists">
            {this.props.song.artists.map(artist =>
              <span className="artist">{artist.name} </span>
            )}
          </div>
        </div>
        {this.props.error?
          <span>Differnce Score: {Math.round(this.props.error)}</span>
          :
          <div></div>
        }

      </div>
      )
    }
  }
  export default SongTile;
