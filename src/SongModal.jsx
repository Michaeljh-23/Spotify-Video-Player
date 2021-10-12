import React from "react";

const SongModal = props => {

  const updatedOnClick = e => {
    props.update(e.target.value);
  }
  return (
    //? ClassnameOptions = Genres / Playlists / Songs
    <div className={props.label}>
      <label className="modalLabel">{props.label}</label>
      <div key={0}>
             {props.list.map((item, idx) => <option key={idx} onClick={updatedOnClick} value={item.track.id}>{item.track.name}</option>)}
      </div>
    </div>
);
}
export default SongModal;