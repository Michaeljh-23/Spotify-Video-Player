const express = require('express');
const morgan = require('morgan');
const routes = require('./controller')
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(routes);

app.use(cors({
  origin: 'https://localhost3455',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600
}));

app.use(express.static(__dirname + '/../dist'));

app.use(morgan('dev'));

const port = 3455
app.listen(port, function() {
  console.log(`There's a Party on Port ${port}`);
});
