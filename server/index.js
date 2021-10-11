const express = require('express');
//const path = require('path')
const axios = require('axios');
const morgan = require('morgan');
const spotify = require('../config.js');


const app = express();
app.use(express.json());

app.get('/token', (req, res) => {
  console.log('getting token')
  axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + Buffer.from(spotify.ClientId + ':' + spotify.ClientSecret).toString('base64')
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

app.use(express.static(__dirname + '/../dist'));

app.use(morgan('dev'));

const port = 3455
app.listen(port, function() {
  console.log(`There's a Party on Port ${port}`);
});
