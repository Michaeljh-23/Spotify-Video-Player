import axios from 'axios';
import React, { useState, useEffect } from 'react';

const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}

const SongPlayer = props => {


  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(props.currSong);

  useEffect(() => {

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {

          const player = new window.Spotify.Player({
              name: 'Web Playback SDK',
              getOAuthToken: cb => { cb(props.token); },
              volume: 0.5
          });

          setPlayer(player);

          player.addListener('ready', ({ device_id }) => {
            sessionStorage.setItem('device_id', device_id)
              console.log('Ready with Device ID', device_id);
          });

          player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
          });

          player.addListener('player_state_changed', ( state => {
              if (!state) {
                  return;
              }

              setTrack(state.track_window.current_track);

              setPaused(state.paused);

              player.getCurrentState().then( state => {
                  (!state)? setActive(false) : setActive(true)
              });

          }));

          player.connect();
      };

  }, []);

if (is_active) {
    console.log(current_track)
      return (
          <>
              <div className="container">
                  <div className="main-wrapper">

                      <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
                      <div className="titleHead">
                      <div className="now-playing__side">
                          <div className="now-playing__name">{current_track.name}</div>
                          <div className="now-playing__artist">{current_track.artists[0].name}</div>
                          </div>
                          <div className="buttons">
                          <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                              &lt;&lt;
                          </button>

                          <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                              { is_paused ? "PLAY" : "PAUSE" }
                          </button>

                          <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                              &gt;&gt;
                          </button>
                          </div>
                      </div>
                  </div>
              </div>
          </>
      );
  } else if (!Array.isArray(props.currSong)) {
    console.log(props.currSong)
    return (
      <>
          <div className="container">
              <div className="main-wrapper">

                  <img src={props.currSong.album.images[0].url} className="now-playing__cover" alt="" />
                  <div className="titleHead">
                  <div className="now-playing__side">
                      <div className="now-playing__name">{props.currSong.name}</div>
                      <div className="now-playing__artist">{props.currSong.artists[0].name}</div>
</div> <div className='buttons'>
                      <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                          &lt;&lt;
                      </button>

                      <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                          { is_paused ? "PLAY" : "PAUSE" }
                      </button>

                      <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                          &gt;&gt;
                      </button>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
  } else if (!is_active) {
    console.log(props.currSong , current_track)
      return (
          <>
              <div className="container">
                  <div className="main-wrapper">
                      <b> Instance not active. Transfer your playback using your Spotify app </b>
                  </div>
              </div>
          </>)
}
}
export default SongPlayer;