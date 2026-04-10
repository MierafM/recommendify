import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import SongTile from "./songTile";
import Cookies from "js-cookie";
import "./trackDetailsStyle.css";

class TrackDetails extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const token = Cookies.get("spotifyAuthToken");
    let trackID = window.location.pathname.split("/")[2];

    const track = await fetch("https://api.spotify.com/v1/tracks/" + trackID, {
      headers: { Authorization: "Bearer " + token },
    }).then((response) => response.json());
    this.setState({ track });

    const features = await fetch(
      "https://api.spotify.com/v1/audio-features/" + trackID,
      {
        headers: { Authorization: "Bearer " + token },
      },
    ).then((response) => response.json());
    this.setState({ features });

    const recs = await fetch(
      "https://api.spotify.com/v1/recommendations?seed_tracks=" +
        track.id +
        "&limit=100" +
        // mood (Danceability, Valence, Energy, Tempo)
        "&target_danceability=" +
        features.danceability +
        "&min_danceability=" +
        (features.danceability - 0.2) +
        "&max_danceability=" +
        (features.danceability + 0.2) +
        "&target_valence=" +
        features.valence +
        "&min_valence=" +
        (features.valence - 0.2) +
        "&max_valence=" +
        (features.valence + 0.2) +
        "&target_energy=" +
        features.energy +
        "&min_energy=" +
        (features.energy - 0.2) +
        "&max_energy=" +
        (features.energy + 0.2) +
        "&target_tempo=" +
        features.tempo +
        "&min_tempo=" +
        (features.tempo - 10) +
        "&max_tempo=" +
        (features.tempo + 10) +
        // properties and context
        "&target_loudness=" +
        features.loudness +
        "&target_speechiness=" +
        features.speechiness +
        "&target_instrumentalness=" +
        features.instrumentalness +
        "&target_acousticness=" +
        features.acousticness +
        "&target_liveness=" +
        features.liveness,
      {
        headers: { Authorization: "Bearer " + token },
      },
    ).then((response) => response.json());
    this.setState({ recommendations: recs.tracks });

    let errors = [];
    for (let song of recs.tracks) {
      const songDetail = await fetch(
        "https://api.spotify.com/v1/audio-features/" + song.id,
        {
          headers: { Authorization: "Bearer " + token },
        },
      ).then((response) => response.json());

      let diff = 0;
      diff +=
        Math.abs(features.danceability - songDetail.danceability) /
        Math.abs(features.danceability);
      diff +=
        Math.abs(features.energy - songDetail.energy) /
        Math.abs(features.energy);
      diff +=
        Math.abs(features.liveness - songDetail.liveness) /
        Math.abs(features.liveness);
      diff +=
        Math.abs(features.loudness - songDetail.loudness) /
        Math.abs(features.loudness);
      diff +=
        Math.abs(features.speechiness - songDetail.speechiness) /
        Math.abs(features.speechiness);
      diff +=
        Math.abs(features.tempo - songDetail.tempo) /
        Math.abs(features.tempo);
      diff +=
        Math.abs(features.valence - songDetail.valence) /
        Math.abs(features.valence);

      errors.push(diff);
    }
    this.setState({ errors });
  }

  render() {
    return (
      <div className="trackDetailsContainer">
        <Header />
        {this.state.track && this.state.features ? (
          <div className="aboutTrack">
            <div className="trackInfo">
              <img
                className="trackIMG"
                src={this.state.track.album.images[1].url}
              />
              <span className="trackName">{this.state.track.name}</span>
              {this.state.track.artists.map((artist) => (
                <span className="trackArtists">{artist.name} </span>
              ))}
            </div>

            <div className="trackDetails">
              <span className="featuresTitle">
                {this.state.track.name}'s Features{" "}
              </span>
              <div className="allFeatures">
                <span className="trackFeatures">
                  acousticness: {this.state.features.acousticness}
                </span>
                <span className="trackFeatures">
                  danceability: {this.state.features.danceability}
                </span>
                <span className="trackFeatures">
                  energy: {this.state.features.energy}
                </span>
                <span className="trackFeatures">
                  key: {this.state.features.key}
                </span>
                <span className="trackFeatures">
                  tempo: {this.state.features.tempo}
                </span>
                <span className="trackFeatures">
                  valence: {this.state.features.valence}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <span>Loading track info...</span>
        )}
        <div className="recommendationSection">
          <span className="recHeader">Recommendations</span>
          {this.state.recommendations && this.state.errors ? (
            <div className="recommendedTiles">
              {this.state.recommendations.map((song, index) => (
                <SongTile song={song} error={this.state.errors[index]} />
              ))}
            </div>
          ) : (
            <span>Loading recommendations ... </span>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}

export default TrackDetails;
