$(function(){
  console.log('document loaded');

  getSongs();

  $('#addSong').on('submit', addSong);
});

function getSongs() {
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });
}

function addSong(event) {
  // stop the browser from trying to navigate away from our page
  event.preventDefault();

  // get the information out of the form
  var songData = $(this).serialize();

  console.log(songData);

  $.ajax({
    url: '/songs',
    type: 'POST',
    data: songData,
    success: getSongs
  })
}

function displaySongs(songs) {
  console.log(songs);

  $('#songs').empty();

  songs.forEach(function(song) {
    $('#songs').append('<li>' + song.title + ' by '
      + song.artist + ' from album ' + song.album + '</li>');
  });
}
