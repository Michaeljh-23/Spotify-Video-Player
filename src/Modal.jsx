import React from "react";
import FontAwesome from "react-fontawesome";
const Modal = props => {

  const updatedOnClick = e => {
    props.update(e.target.value);
  }
  return (
    //? ClassnameOptions = Genres / Playlists / Songs
    <div id={props.label}>
      <h3 className="modalLabel">{props.label}</h3>
      <div>
             {props.list.map((item, idx) => <div><FontAwesome
             className="fa-folder-open" name="folder-open"/><option className="option" key={idx + 1} value={props.currItem} onClick={updatedOnClick} value={item.id}>{item.name}</option></div>)}
      </div>
    </div>
);
}
export default Modal;