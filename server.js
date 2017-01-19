var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var songs = require('./data.json');

var app = express();

app.use(express.static('public'));

// convert any url encoded body into a JS object
// added to req.body
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/songs', function(req, res) {
  res.send(songs);
});

app.post('/songs', function(req, res) {
  var isBlank = false; // assumes no blanks in form entries
  isBlank = checkIfBlank(req.body);

  var isDuplicate = false // assumes not a duplicate
  isDuplicate = checkIfDuplicate(req.body, songs);

  if (isDuplicate) {
    res.status(400).send('Duplicate Song');

  } else if (isBlank) {
    res.status(400).send('Incomplete Fields');

  } else {
    // before pushing to songs, we want to add the current date
    // req.body.dateAdded = new Date().toLocaleString('en-US');
    req.body.dateAdded = new Date().toDateString(); // looks nicer
    songs.push(req.body);
    res.sendStatus(200);
  };

  // if (isBlank || isDuplicate) { // if either are true, send failure
  //   res.sendStatus(400);
  //
  // } else {
  // req.body.dateAdded = new Date().toLocaleString('en-US');
  // songs.push(req.body);
  // res.sendStatus(200);
  // };
});


app.listen(3000);


function checkIfBlank (currentSong) {
// returns true if one is blank, false if none.
return (currentSong.title == "" || currentSong.artist == "" || currentSong.album == "")

};

function checkIfDuplicate (currentSong, songs) {
var isDup = false;
// returns true if there is a duplicate
// duplicates are songs with the same artist, title, and album.

  return songs.some(function (temp) { // .some can be broken out of!
    return currentSong.title == temp.title && currentSong.artist == temp.artist && currentSong.album == temp.album;
  });  // breaks when true, but still need a second return if false


  // this was my function and return statements.
  // songs.forEach( function (temp) {
  //   if (currentSong.title == temp.title && currentSong.artist == temp.artist && currentSong.album == temp.album) {
  //     isDup = true;
  //   };
  // });
  // return isDup;
};
