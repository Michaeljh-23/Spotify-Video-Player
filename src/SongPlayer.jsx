import React from "react";

const SongPlayer = props => {

  const updatedOnClick = e => {
    props.update(e.target.value);
  }

  return (
    //? ClassnameOptions = Genres / Playlists / Songs
    <div className={props.label}>
      <label className="currentlyPlaying">{props.label}</label>
    </div>
);
}
export default SongPlayer;