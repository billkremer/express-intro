var express = require('express');
var path = require('path');


var app = express();

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.get('/data', function(req, res) {
  res.sendFile(path.join(__dirname, 'data.json'));
});

app.listen(3000);
