import React, {useMemo} from "react";
import { useTable } from 'react-table'
import FontAwesome from "react-fontawesome";

const SongModal = props => {

  const updatedOnClick = e => {
    props.update(e.target.value);
  }
  const convertMS = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }


  return (
    //? ClassnameOptions = Genres / Playlists / Songs
    <div className={props.label}>
      <label className="modalLabel"></label>
      <div key={0}>
             {props.list.map((item, idx) => <div>
               <table key={idx} value={item.track.id}>
                 <thead>
                   <tr>
                     <th className='trackth'>Track</th>
                     <th className='artistth'>Artist</th>
                     <th className='albumth'>Album</th>
                     <th className='durationth'>Duration</th>
                     <th className='queueUp'>Queue up</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>{item.track.name}</td>
                     <td>{item.track.artists[0].name}</td>
                     <td>{item.track.album.name}</td>
                     <td>{convertMS(item.track.duration_ms)}</td>
                     {/* <FontAwesome
             className="file-audio" name="file-audio"/>*/}
                     <option id='queuebtn' value={item.track.id} onClick={updatedOnClick}></option>
                   </tr>
                 </tbody>
               </table>
              {/* <FontAwesome
             className="file-audio" name="file-audio"/>*/}
             </div>)
             // {item.track.name} {item.track.artists[0].name} {item.track.album.name} {convertMS(item.track.duration_ms)}
            }

      </div>
    </div>
);
}
export default SongModal;