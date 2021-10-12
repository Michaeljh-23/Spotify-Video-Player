import React from "react";

const Modal = props => {

  const updatedOnClick = e => {
    props.update(e.target.value);
  }
  return (
    //dropdown fashion
    // <div className="modalGroup">
    //     <label className="modalLabel">{props.label}</label>
    //     <select value={props.currItem} onChange={updatedOnClick} className="form-control">
    //         <option key={0}>Pick a genre</option>
    //         {props.list.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
    //     </select>
    // </div>
    //? ClassnameOptions = Genres / Playlists / Songs
    <div className={props.label}>
      <label className="modalLabel">{props.label}</label>
      <div key={0}>
             {props.list.map((item, idx) => <option key={idx + 1} value={props.currItem} onClick={updatedOnClick} value={item.id}>{item.name}</option>)}
      </div>
    </div>
);
}
export default Modal;