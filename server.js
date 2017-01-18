var express = require('express');
var path = require('path');
var songs = require('./data.json');

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/data', function(req, res) {
  res.send(songs);
});

app.listen(3000);
