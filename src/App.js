import axios from "axios";
import React from "react";
import Modal from "./Modal.jsx";
import SongModal from "./SongModal.jsx";
import Login from "./Login.jsx";
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
      currSong: []
  }
  this.genreUpdate = this.genreUpdate.bind(this)
  this.playlistUpdate = this.playlistUpdate.bind(this)
  this.songUpdate = this.songUpdate.bind(this)
  }
  componentDidMount() {
    axios.get('/auth/token')
    .then((token) => {
      this.setState({
        token: token.access_token
      })
    //   axios.get(`/genres/${token.data}`)
    //   .then((genreData) => {
    //     this.setState({
    //       genres: genreData.data.items
    //     })
    //   })
    })
    .catch(err => { console.log(err)})
  }
  genreUpdate = genre => {
    this.setState({
      currGenre: genre
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
      currPlaylist: playlist
    });
   axios(`/songs/${this.state.token}&${playlist}`)
    .then(songsResponse => {
      this.setState({
        songs: songsResponse.data.items
      })
    });
  }
  songUpdate = song => {
    const currentSong = [...this.state.songs];

    const trackDetails = currentSong.filter(t => t.track.id === song);

    this.setState({
      currSong: trackDetails[0].track
    });

  }

  render() {
    const { name } = this.props;
    console.log(this.state)
    if (this.state.token === '' || this.state.token === undefined) {
      return (
        <Login/>
      )
    } else {
    return (
      <>
        <h1>
          Hello {name}
        </h1>
        <Modal update={this.genreUpdate} label="Genres" list={this.state.genres} currItem={this.state.currGenre}/>
        <br></br>
        <Modal update={this.playlistUpdate} label="Playlists" list={this.state.playlists} currItem={this.state.currPlaylist}/>
        <br></br>
        <SongModal update={this.songUpdate} label="Songs" list={this.state.songs} currItem={this.state.currSong}/>
    </>
    )};
  }
}

export default App;
