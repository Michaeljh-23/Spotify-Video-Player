import axios from "axios";
import React from "react";
import Modal from "./Modal.jsx";
import SongModal from "./SongModal.jsx";
import Login from "./Login.jsx";
import SongPlayer from "./SongPlayer.jsx";
import VideoPlayer from './VideoPlayer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      genres: [],
      currGenre: [],
      playlists: [],
      currPlaylist: [],
      songs: [],
      currSong: [],
      player: '',
      playlistShow: false,
      songShow: false
    }
    this.genreUpdate = this.genreUpdate.bind(this)
    this.playlistUpdate = this.playlistUpdate.bind(this)
    this.songUpdate = this.songUpdate.bind(this)
  }

  componentDidMount() {
    axios.get('/auth/token')
      .then((token) => {
        console.log(token)
        this.setState({
          token: token.data
        })
        axios.get(`/genres/${token.data}`)
          .then((genreData) => {
            this.setState({
              genres: genreData.data.items
            })
          })
      })
      .catch(err => { console.log(err) })
  }
  genreUpdate = genre => {
    this.setState({
      currGenre: genre,
      playlistShow: true
    });

    axios(`/playlists/${this.state.token}&${genre}`)
      .then(playlistResponse => {
        this.setState({
          playlists: playlistResponse.data
        })
      });
    console.log(genre); // ex hip hop
  }

  playlistUpdate = playlist => {
    this.setState({
      currPlaylist: playlist,
      songShow: true
    });
    axios(`/songs/${this.state.token}&${playlist}`)
      .then(songsResponse => {
        this.setState({
          songs: songsResponse.data.items
        })
      });
  }
  songUpdate = song => {
    const device_id = sessionStorage.getItem('device_id')

    const currentSong = [...this.state.songs];

    const trackDetails = currentSong.filter(t => t.track.id === song);

    this.setState({
      currSong: trackDetails[0].track
    })


    console.table('DEVICE ID', trackDetails[0].track.uri),
      axios.post(`/playingSong/${this.state.token}&${trackDetails[0].track.uri}&${device_id}`)

  }

  render() {
    const { name } = this.props;
    console.log(this.state)
    if (this.state.token === '' || this.state.token === undefined) {
      return (
        <Login />
      )
    } else {
      return (
        <div className="videoPlayerX">
          <VideoPlayer genre={this.state.currGenre} />

        <div className="appwrap">
          {/* <div className='nav'></div> */}
          <Modal id='genres' update={this.genreUpdate} label="Genres" list={this.state.genres} currItem={this.state.currGenre} />
          <br></br>
          {this.state.playlistShow ?
            <Modal id='playlists' update={this.playlistUpdate} label="Playlists" list={this.state.playlists} currItem={this.state.currPlaylist} />
            : null}
          <br></br>
          {this.state.songShow ?
            <SongModal id='tracks' update={this.songUpdate} label="Songs" list={this.state.songs} currItem={this.state.currSong} />
            : null}
          <br></br>
          <SongPlayer id='player' token={this.state.token} currSong={this.state.currSong} />

        </div>
            </div>
      )
    };
  }
}

export default App;
