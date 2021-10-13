import React from "react";

const VideoPlayer = props => {

  const src = {
    hiphop: 'https://www.tubebacks.com/static/preview/stock-video-free-hd-motion-graphics-no-copyright-video-copyright-free-green-screen-background-animation-download-152115.mp4',
    fresh_finds: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-100237.mp4',
    toplists: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-104529.mp4',
    pop: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-104119.mp4',
    country: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-7402.mp4',
    chill: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-6523.mp4',
    inspirational: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-13228.mp4',
    rock: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-100193.mp4',
    latin: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-100194.mp4',
    mood: 'https://www.tubebacks.com/static/preview/stock-video-special-fx-4k-motion-graphics-no-copyright-video-copyright-free-green-screen-background-animation-download-154966.mp4',
    workout: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-100383.mp4',
    rnb: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-6494.mp4',
    edm_dance: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-36137.mp4',
    at_home: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-100463.mp4',
    popculture: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-100479.mp4',
    indie_alt: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-152039.mp4',
    decades: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-152009.mp4',
    pride: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-153994.mp4',
    radar: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-97483.mp4',
    roots: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-154543.mp4',
    sleep: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-8908.mp4',
    regional_mexican: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-25796.mp4',
    frequency: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-38551.mp4',
    focus: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-4k-motion-graphics-green-screen-background-animation-download-151912.mp4',
    student: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-98292.mp4',
    caribbean: 'https://www.tubebacks.com/static/preview/stock-video-no-copyright-video-copyright-free-hd-motion-graphics-green-screen-background-animation-download-13278.mp4'
  }
  var btn = document.getElementById("myBtn")
  var video = document.getElementById("myVideo");
  const pauseNPlay = () => {
    if (video.paused) {
      video.play();
      btn.innerHTML = "Pause";
    } else {
      video.pause();
      btn.innerHTML = "Play";
    }
  }

  const genre = props.genre
  console.log('get genre', genre)
  if (genre === null || genre === '' || genre.length < 1 || genre === undefined) {
    return (
      <image alt="stars-startup"
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.spacetelescope.org%2Farchives%2Fimages%2Fscreen%2Fpotw1209a.jpg&f=1&nofb=1" />
    )
  } else {
    console.log('src', src[genre])
    return (
      <div>
      <video id='myVideo' width='100%' height='100%' loop={true} autoPlay={true} src={src[genre]} ></video>
      <button id="myBtn" onClick={pauseNPlay}>Pause</button>
    </div>
);
}
}
export default VideoPlayer;