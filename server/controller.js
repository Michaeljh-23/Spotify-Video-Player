var router = require('express').Router();
var axios = require('axios');
const spotify = require('../config.js');

// host to api calls
//? Login Auth
global.access_token = ''
var spotify_redirect_uri = 'http://localhost:8888/auth/callback'

var spotify_client_id = spotify.ClientId
var spotify_client_secret = spotify.ClientSecret

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
router.get('/auth/login', (req, res) => {
  console.log('login')
  var scope = "streaming user-read-email user-read-private"
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

router.get('/auth/callback', (req, res) => {
  console.log('login2')
  var code = req.query.code;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };
console.log('redirecting')
  axios.post(authOptions)
  .then(response => {
    if (!error && response.statusCode === 200) {
      access_token = response.body.access_token;
      res.redirect('/')
    }
  })
  .catch(err => {
    res.send(err)
  })

})

router.get('/auth/token', (req, res) => {
  res.send({access_token})
})


router.get('/token', (req, res) => {
  console.log('getting token')
  axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + Buffer.from(spotify.ClientId + ':' + spotify.ClientSecret).toString('base64'),
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {
      res.send(tokenResponse.data.access_token);
    })
    .catch(err => {
      res.send(err)
    })
});
router.get('/genres/:token', (req, res) => {

  axios('https://api.spotify.com/v1/browse/categories?locale=US', {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + req.params.token}
  })
  .then (genreResponse => {
    res.send(genreResponse.data.categories)
  })
  .catch(err => {
    res.send(err)
  })
});
router.get('/playlists/:token&:genre', (req, res) => {
  console.log('params', req.params, req.query)
  axios(`https://api.spotify.com/v1/browse/categories/${req.params.genre}/playlists?limit=10`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + req.params.token}
  })
  .then(playlistResponse => {
    console.log('PLAYLIST resp', playlistResponse.data.playlists.items)
    res.send(playlistResponse.data.playlists.items)
  })
  .catch(err => {
    console.log(err)
    res.send(err)
  })
})

router.get('/songs/:token&:playlist', (req, res) => {
  axios(`https://api.spotify.com/v1/playlists/${req.params.playlist}/tracks?limit=10`, {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + req.params.token
    }
  })
  .then(songsResponse => {
    console.log('Songs resp', songsResponse.data)
    res.send(songsResponse.data)
  })
  .catch(err => {
    console.log(err)
    res.send(err)
  })
})
module.exports = router;